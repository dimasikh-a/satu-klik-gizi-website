import { db } from "@/lib/db";

const PAGE_SIZE = 5;

export async function getActivities(
  search?: string,
  page = 1
) {
  const where = {
    is_active: true,

    ...(search
      ? {
          OR: [
            {
              judul_kegiatan: {
                contains: search,
                mode: "insensitive" as const,
              },
            },
            {
              keterangan: {
                contains: search,
                mode: "insensitive" as const,
              },
            },
            {
              jam: {
                contains: search,
              },
            },
          ],
        }
      : {}),
  };

  const total = await db.kegiatan.count({
    where,
  });

  const kegiatan = await db.kegiatan.findMany({
    where,

    skip: (page - 1) * PAGE_SIZE,

    take: PAGE_SIZE,

    orderBy: {
      idkegiatan: "asc",
    },
  });

  return {
    kegiatan,

    totalPages: Math.ceil(
      total / PAGE_SIZE
    ),
  };
}