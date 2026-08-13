"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function deleteRecommendation(
  idrekomendasi: number
) {
  await db.rekomendasi.update({
  where: {
    idrekomendasi: idrekomendasi,
  },
    data: {
      isActive:false
    },
  });

  revalidatePath(
    "/admin/dashboard/data-rekomendasi"
  );
}