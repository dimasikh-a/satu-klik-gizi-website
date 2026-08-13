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
    formData.get("asi_eksklusif") === "true";

    
  if (!idbalita || !tglperiksa || !bb || !tb) {
    return {
      error: "Semua field wajib diisi.",
    };
  }
if (!cara_pengukuran) {
  return {
    success: false,
    message: "Cara pengukuran wajib dipilih.",
  };
}
  try {
    // Ambil data balita
    const balita = await db.balita.findUnique({
      where: {
        idbalita,
      },
    });

    if (!balita) {
      return {
        error: "Data balita tidak ditemukan.",
      };
    }

    // Hitung umur dalam bulan
    const umurBulan = calculateAgeInMonths(
      balita.tanggallahir,
      new Date(tglperiksa)
    );

    console.log("========== CREATE PEMERIKSAAN ==========");
console.log({
  gender: balita.jeniskelamin,
  umurBulan,
  bb,
  tb,
});

    // Hitung status BB/U
    const statusBB = calculateWeightForAge({
      gender: balita.jeniskelamin,
      umur: umurBulan,
      berat: bb,
    });

    // Hitung status TB/U
    const statusTB = calculateLengthForAge({
      gender: balita.jeniskelamin,
      umur: umurBulan,
      tinggi: tb,
    });

    const hasilGizi = calculateWeightForHeight({
  gender: balita.jeniskelamin,
  umurBulan,
  tinggi: Number(tb),
  berat: Number(bb),
});

    // Simpan ke database
    await db.pemeriksaan.create({
      data: {
        idbalita,

        tglperiksa: new Date(tglperiksa),

        umur_bulan: umurBulan,

        bb,

        tb,

        asi_eksklusif: asiEksklusif,

        cara_pengukuran:cara_pengukuran,

        statusbb: statusBB,

        statustb: statusTB,
        hasilgizi: hasilGizi,
      },
    });

    revalidatePath("/admin/dashboard/data-pemeriksaan");

    return {
      success: "Data pemeriksaan berhasil ditambahkan.",
    };
  } catch (error) {
    console.error("CREATE PEMERIKSAAN ERROR:", error);

    return {
      error: "Terjadi kesalahan pada server.",
    };
  }
}