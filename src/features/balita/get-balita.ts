import { db } from "@/lib/db";

const PAGE_SIZE = 5;

export async function getBalita(
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
              },
            },
            {
              nik_anak: {
                contains: search,
                mode: "insensitive" as const,
              },
            },
            {
              namaanak: {
                contains: search,
                mode: "insensitive" as const,
              },
            },
          ],
        }
      : {}),
  };

  const total = await db.balita.count({
    where,
  });

  const data = await db.balita.findMany({
    where,

    skip: (page - 1) * PAGE_SIZE,

    take: PAGE_SIZE,

    orderBy: {
      namaanak: "asc",
    },
  });

  const balitas = data.map((balita) => ({
    ...balita,

    bblahir: balita.bblahir ?? null,

    tblahir: balita.tblahir ?? null,
  }));

  return {
    balitas,
    totalPages: Math.ceil(total / PAGE_SIZE),
  };
}