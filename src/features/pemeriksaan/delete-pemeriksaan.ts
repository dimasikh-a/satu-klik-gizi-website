"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function deletePemeriksaan(
  id: number
) {
  await db.pemeriksaan.update({
    where: {
      idperiksa: id,
    },
    data: {
      is_active: false,
    },
  });

  revalidatePath(
    "/admin/dashboard/data-pemeriksaan"
  );
}