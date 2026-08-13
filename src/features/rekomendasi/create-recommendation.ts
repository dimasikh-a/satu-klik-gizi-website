"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function createDataRecommendation(
  prevState: any,
  formData: FormData
) {
  // ==========================
  // Ambil Data Form
  // ==========================
  const kategori = formData
    .get("kategori")
    ?.toString()
    .trim();

  const deskripsi = formData
    .get("deskripsi")
    ?.toString()
    .trim();

  // ==========================
  // Validasi
  // ==========================
  if (!kategori || !deskripsi) {
    return {
      error: "Semua field wajib diisi.",
    };
  }

  try {
    // ==========================
    // Simpan Data
    // ==========================
    await db.rekomendasi.create({
      data: {
        kategori,
        deskripsi,
      },
    });

    revalidatePath("/admin/dashboard/data-rekomendasi");

    return {
      success: "Data rekomendasi berhasil ditambahkan.",
    };
  } catch (error) {
    console.error("CREATE REKOMENDASI ERROR:", error);

    return {
      error: "Terjadi kesalahan pada server.",
    };
  }
}