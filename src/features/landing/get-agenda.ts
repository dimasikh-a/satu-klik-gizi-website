import { db } from "@/lib/db";

export async function getAgenda() {
  return await db.kegiatan.findMany({
    where: {
      is_active: true,
    },

    orderBy: {
      tanggal_pelaksanaan: "asc",
    },

    take: 6,
  });
}