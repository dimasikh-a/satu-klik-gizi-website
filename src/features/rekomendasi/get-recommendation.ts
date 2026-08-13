import { Prisma } from "@prisma/client";
import { db } from "@/lib/db";

const PAGE_SIZE = 5;

export async function getRecommendation(
  search?: string,
  page: number = 1
) {
  const keyword = search?.trim();

  const where: Prisma.rekomendasiWhereInput = {};

  if (keyword) {
    where.OR = [];

    // Cari berdasarkan ID jika input berupa angka
    if (!isNaN(Number(keyword))) {
      where.OR.push({
        idrekomendasi: Number(keyword),
      });
    }

    // Cari berdasarkan kategori
    where.OR.push({
      kategori: {
        contains: keyword,
      },
    });

    // Cari berdasarkan deskripsi
    where.OR.push({
      deskripsi: {
        contains: keyword,
      },
    });
  }

  const total = await db.rekomendasi.count({
    where,
  });

  const rekomendasi = await db.rekomendasi.findMany({
    where,
    orderBy: {
      idrekomendasi: "asc",
    },
    skip: (page - 1) * PAGE_SIZE,
    take: PAGE_SIZE,
  });

  return {
    rekomendasi,
    totalPages: Math.ceil(total / PAGE_SIZE),
    currentPage: page,
    totalData: total,
  };
}