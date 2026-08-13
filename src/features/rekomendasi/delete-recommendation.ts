"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function deleteRekomendasi(
  id: number
): Promise<void> {
  try {
    await db.rekomendasi.delete({
      where: {
        idrekomendasi: id,
      },
    });

    revalidatePath(
      "/admin/dashboard/data-rekomendasi"
    );
  } catch (error) {
    console.error(
      "========== DELETE REKOMENDASI ERROR =========="
    );

    console.error(error);

    throw new Error(
      "Gagal menghapus data rekomendasi."
    );
  }
}