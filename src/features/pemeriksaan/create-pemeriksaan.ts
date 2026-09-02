"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";

import { calculateAgeInMonths } from "../../../engine/utils/age";
import { calculateLengthForAge } from "../../../engine/indicators/length-for-age";
import { calculateWeightForAge } from "../../../engine/indicators/weight-for-age";
import { calculateWeightForHeight } from "../../../engine/indicators/weight-for-height";

export async function createPemeriksaan(
  prevState: any,
  formData: FormData
) {
  // ==========================
  // AMBIL DATA FORM
  // ==========================

  const idbalita = Number(formData.get("idbalita"));

  const tglperiksa = formData
    .get("tglperiksa")
    ?.toString()
    .trim();

  const bb = Number(formData.get("bb"));
  const tb = Number(formData.get("tb"));

  const cara_pengukuran = formData
    .get("cara_pengukuran")
    ?.toString()
    .trim();

  const asiEksklusif =
    formData.get("asi_eksklusif")?.toString() ?? null;

  console.log("========== FORM PEMERIKSAAN ==========");

  console.log({
    idbalita,
    tglperiksa,
    bb,
    tb,
    cara_pengukuran,
    asiEksklusif,
  });

  // ==========================
  // VALIDASI INPUT
  // ==========================

  if (
    !idbalita ||
    !tglperiksa ||
    !bb ||
    !tb
  ) {
    return {
      error: "Semua field wajib diisi.",
    };
  }

  if (!cara_pengukuran) {
    return {
      error: "Cara pengukuran wajib dipilih.",
    };
  }

  // ==========================
  // PROSES
  // ==========================

  try {
    // ==========================
    // 1. AMBIL DATA BALITA
    // ==========================

    const balita = await db.balita.findUnique({
      where: {
        idbalita,
      },
    });

    console.log("1. DATA BALITA:", balita);

    if (!balita) {
      return {
        error: "Data balita tidak ditemukan.",
      };
    }

    // ==========================
    // 2. VALIDASI DATA BALITA
    // ==========================

    if (!balita.tanggallahir) {
      return {
        error: "Tanggal lahir balita belum tersedia.",
      };
    }

    if (!balita.jeniskelamin) {
      return {
        error: "Jenis kelamin balita belum tersedia.",
      };
    }

    console.log("2. DATA BALITA VALID:", {
      idbalita: balita.idbalita,
      namaanak: balita.namaanak,
      jeniskelamin: balita.jeniskelamin,
      tanggallahir: balita.tanggallahir,
    });

    // ==========================
    // 3. HITUNG UMUR
    // ==========================

    const tanggalPeriksa = new Date(tglperiksa);

    if (Number.isNaN(tanggalPeriksa.getTime())) {
      return {
        error: "Tanggal pemeriksaan tidak valid.",
      };
    }

    const umurBulan = calculateAgeInMonths(
      balita.tanggallahir,
      tanggalPeriksa
    );

    console.log("3. UMUR BULAN:", umurBulan);

    if (umurBulan < 0) {
      return {
        error:
          "Tanggal pemeriksaan tidak boleh sebelum tanggal lahir balita.",
      };
    }

    // ==========================
    // 4. HITUNG STATUS BB/U
    // ==========================

    console.log("4. MULAI HITUNG BB/U");

    const statusBB = calculateWeightForAge({
      gender: balita.jeniskelamin,
      umur: umurBulan,
      berat: bb,
    });

    console.log("4. STATUS BB/U:", statusBB);

    // ==========================
    // 5. HITUNG STATUS TB/U
    // ==========================

    console.log("5. MULAI HITUNG TB/U");

const statusTB = calculateLengthForAge({
  gender: balita.jeniskelamin,
  umur: umurBulan,
  tinggi: tb,
  caraPengukuran: cara_pengukuran,
});

    console.log("5. STATUS TB/U:", statusTB);

    // ==========================
    // 6. HITUNG BB/TB
    // ==========================

    console.log("6. MULAI HITUNG BB/TB");

    const hasilGizi = calculateWeightForHeight({
      gender: balita.jeniskelamin,
      umurBulan,
      tinggi: Number(tb),
      berat: Number(bb),
    });

    console.log("6. HASIL BB/TB:", hasilGizi);

    // ==========================
    // 7. SIMPAN PEMERIKSAAN
    // ==========================

    console.log("7. MULAI SIMPAN DATABASE");

    const pemeriksaan = await db.pemeriksaan.create({
      data: {
        idbalita,

        tglperiksa: tanggalPeriksa,

        umur_bulan: umurBulan,

        bb,

        tb,

        asi_eksklusif: asiEksklusif,

        cara_pengukuran,

        statusbb: statusBB,

        statustb: statusTB,

        hasilgizi: hasilGizi,
      },
    });

    console.log("8. PEMERIKSAAN BERHASIL:", {
      idperiksa: pemeriksaan.idperiksa,
      idbalita: pemeriksaan.idbalita,
    });

    // ==========================
    // 8. REFRESH DATA
    // ==========================

    revalidatePath(
      "/admin/dashboard/data-pemeriksaan"
    );

    revalidatePath(
      "/admin/dashboard"
    );

    // ==========================
    // SUCCESS
    // ==========================

    return {
      success:
        "Data pemeriksaan berhasil ditambahkan.",
    };
  } catch (error) {
    // ==========================
    // ERROR DETAIL
    // ==========================

    console.error(
      "========================================"
    );

    console.error(
      "CREATE PEMERIKSAAN ERROR"
    );

    console.error(
      "========================================"
    );

    console.error(error);

    if (error instanceof Error) {
      console.error("ERROR MESSAGE:", error.message);

      console.error(
        "ERROR STACK:",
        error.stack
      );
    }

    return {
      error:
        error instanceof Error
          ? error.message
          : "Terjadi kesalahan pada server.",
    };
  }
}