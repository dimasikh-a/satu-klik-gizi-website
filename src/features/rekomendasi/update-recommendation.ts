"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function UpdateRecommendation(
  id_rekomendasi: number,
  prevState: any,
  formData: FormData
) {
  const rekomendasi =
    formData.get("rekomendasi")?.toString().trim();

  const hasilanalisis =
    formData.get("hasilanalisis")?.toString().trim();


  if (
    !rekomendasi ||
    !hasilanalisis 
  ) {
    return {
      error: "Semua field wajib diisi",
    };
  }

  try {
    await db.rekomendasi.update({
      where: {
        idrekomendasi: id_rekomendasi,
      },
      data: {
        rekomendasi: rekomendasi,
        hasilanalisa: hasilanalisis
      },
    });

    revalidatePath(
      "/admin/dashboard/data-rekomendasi"
    );

    return {
      success:
        "Data rekomendasi berhasil diperbarui",
    };
  } catch (error) {
  console.error("UPDATE REKOMENDASI ERROR:", error);

  return {
    error: "Gagal memperbarui data rekomendasi",
  };
}
}