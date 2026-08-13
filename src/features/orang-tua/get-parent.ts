import { db } from "@/lib/db";

const PAGE_SIZE = 5;

export async function getParent(
  search?: string,
  page = 1
) {
  const where = {
    is_active: true,

    ...(search
      ? {
          OR: [
            {
              nokk: {
                contains: search,
                mode: "insensitive" as const,
              },
            },
            {
              namaibu: {
                contains: search,
              },
            },
            {
              namaayah: {
                contains: search,
                mode: "insensitive" as const,
              },
            },
            {
              alamat: {
                contains: search,
                mode: "insensitive" as const,
              },
            },            
            {
              notelp: {
                contains: search,
                mode: "insensitive" as const,
              },
            },
          ],
        }
      : {}),
  };

  const total =
    await db.orang_tua.count({
      where,
    });

  const parent =
    await db.orang_tua.findMany({
      where,

      skip:
        (page - 1) *
        PAGE_SIZE,

      take: PAGE_SIZE,

      orderBy: {
        nokk: "asc",
      },
    });

  return {
    parent,

    totalPages: Math.ceil(
      total / PAGE_SIZE
    ),
  };
}