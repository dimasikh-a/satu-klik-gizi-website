"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";

export async function updateRecommendation(
  idperiksa: number,
  _: unknown,
  formData: FormData
) {
  const deskripsi = formData
    .get("deskripsi")
    ?.toString()
    .trim();

  if (!deskripsi) {
    return {
      error: "Rekomendasi wajib diisi.",
    };
  }

  try {
    await db.rekomendasi.update({
      where: {
        idperiksa: idperiksa,
      },

      data: {
        deskripsi,
      },
    });

    revalidatePath(
      "/admin/dashboard/data-rekomendasi"
    );

    revalidatePath(
      "/admin/dashboard/data-pemeriksaan"
    );

    return {
      success:
        "Rekomendasi berhasil diperbarui.",
    };
  } catch (error) {
    console.error(
      "UPDATE REKOMENDASI ERROR:",
      error
    );

    return {
      error:
        "Gagal memperbarui rekomendasi.",
    };
  }
}