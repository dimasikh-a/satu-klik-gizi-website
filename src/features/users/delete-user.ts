"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function deleteUser(
  id: number
) {
  await db.users.update({
    where: {
      id_user: id,
    },
    data: {
      is_active: false,
    },
  });

  revalidatePath(
    "/admin/dashboard/data-user"
  );
}