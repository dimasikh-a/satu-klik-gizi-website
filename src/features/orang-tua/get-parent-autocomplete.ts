"use server";

import { db } from "@/lib/db";

export async function getParentAutocomplete(
  search?: string
) {
  const parents = await db.orang_tua.findMany({
    where: {
      is_active: true,

      ...(search
        ? {
            OR: [
              {
                nokk: {
                  contains: search,
                },
              },
              {
                nama_ibu: {
                  contains: search,
                  mode: "insensitive",
                },
              },
              {
                nama_ayah: {
                  contains: search,
                  mode: "insensitive",
                },
              },
            ],
          }
        : {}),
    },

    select: {
      id_orang_tua: true,
      nokk: true,
      nama_ibu: true,
      nama_ayah: true,
    },

    orderBy: {
      nokk: "asc",
    },
  });

  return parents;
}