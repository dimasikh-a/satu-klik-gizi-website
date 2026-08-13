"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";

import { calculateAgeInMonth } from "@/lib/who/calculate-age";
import { calculateWeightForAge } from "../../../engine/indicators/weight-for-age";
import { calculateLengthForAge } from "../../../engine/indicators/length-for-age";

export async function updatePemeriksaan(
  id: number,
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

    // Hitung umur
    const umurBulan = calculateAgeInMonth(
      balita.tanggallahir,
      new Date(tglperiksa)
    );

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

    // Update pemeriksaan
    await db.pemeriksaan.update({
      where: {
        idperiksa: id,
      },
      data: {
        idbalita,

        tglperiksa: new Date(tglperiksa),

        umur_bulan: umurBulan,

        bb,

        tb,

        cara_pengukuran: cara_pengukuran,

        asi_eksklusif: asiEksklusif,

        statusbb: statusBB,

        statustb: statusTB,
      },
    });

    revalidatePath(
      "/admin/dashboard/data-pemeriksaan"
    );

    return {
      success:
        "Data pemeriksaan berhasil diperbarui.",
    };
  } catch (error) {
    console.error(
      "UPDATE PEMERIKSAAN ERROR:",
      error
    );

    return {
      error:
        "Gagal memperbarui data pemeriksaan.",
    };
  }
}