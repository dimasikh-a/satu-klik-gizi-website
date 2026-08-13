"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function deleteBalita(
  idbalita: number
) {
  await db.balita.update({
    where: {
      idbalita: idbalita,
    },
    data: {
      is_active: false,
    },
  });
  console.log(
  "DELETE KIA:",
  idbalita
);

  revalidatePath(
    "/admin/dashboard/data-balita"
  );
}