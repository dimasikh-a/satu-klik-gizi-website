"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function deleteOrangTua(
  nokk: string
) {
  await db.orang_tua.update({
  where: {
    nokk: nokk,
  },
    data: {
      is_active: false,
    },
  });

  revalidatePath(
    "/admin/dashboard/data-orang-tua"
  );
}