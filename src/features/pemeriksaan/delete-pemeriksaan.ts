"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function deletePemeriksaan(
  id: number
): Promise<void> {
  try {
    await db.pemeriksaan.delete({
      where: {
        idperiksa: id,
      },
    });

    revalidatePath(
      "/admin/dashboard/data-pemeriksaan"
    );

    revalidatePath(
      "/admin/dashboard/data-rekomendasi"
    );
  } catch (error) {
    console.error(
      "========== DELETE PEMERIKSAAN ERROR =========="
    );
    console.error(error);

    throw new Error(
      "Gagal menghapus data pemeriksaan."
    );
  }
}