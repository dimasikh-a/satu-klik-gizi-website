"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function deleteActivity(
  id: number
) {
  await db.kegiatan.update({
    where: {
      idkegiatan: id,
    },
    data: {
      is_active: false,
    },
  });

  revalidatePath(
    "/admin/dashboard/data-kegiatan"
  );
}