import { Prisma } from "@prisma/client";

import { db } from "@/lib/db";

const PAGE_SIZE = 5;

export async function getRecommendation(
  search?: string,
  page: number = 1
) {
  const keyword = search?.trim();

  const where: Prisma.rekomendasiWhereInput = {
    is_active: true,
  };

  if (keyword) {
    where.OR = [];

    // Cari berdasarkan ID Rekomendasi
    if (!isNaN(Number(keyword))) {
      where.OR.push({
        idrekomendasi: Number(keyword),
      });
    }

    // Cari berdasarkan Deskripsi
    where.OR.push({
      deskripsi: {
        contains: keyword,
        mode: "insensitive",
      },
    });

    // Cari berdasarkan Nama Anak
    where.OR.push({
      pemeriksaan: {
        balita: {
          namaanak: {
            contains: keyword,
            mode: "insensitive",
          },
        },
      },
    });

    // Cari berdasarkan NIK Anak
    where.OR.push({
      pemeriksaan: {
        balita: {
          nik_anak: {
            contains: keyword,
            mode: "insensitive",
          },
        },
      },
    });
  }

  const total = await db.rekomendasi.count({
    where,
  });

  const rekomendasi = await db.rekomendasi.findMany({
    where,

    include: {
      pemeriksaan: {
        include: {
          balita: {
            include: {
              orang_tua: {
                select: {
                  nama_ayah: true,
                  nama_ibu: true,
                },
              },
            },
          },
        },
      },
    },

    orderBy: {
      created_at: "desc",
    },

    skip: (page - 1) * PAGE_SIZE,

    take: PAGE_SIZE,
  });
  console.log(
  "========== GET REKOMENDASI =========="
);

console.log(
  "TOTAL DATABASE:",
  total
);

console.log(
  "DATA PAGE:",
  rekomendasi.length
);

console.log(
  "ID REKOMENDASI:",
  rekomendasi.map(
    (item) => item.idrekomendasi
  )
);

console.log(
  "ID PEMERIKSAAN:",
  rekomendasi.map(
    (item) => item.idperiksa
  )
);

console.log(
  "NAMA ANAK:",
  rekomendasi.map(
    (item) =>
      item.pemeriksaan.balita.namaanak
  )
);

  const serializedRecommendation = rekomendasi.map(
    (item) => ({
      ...item,

      pemeriksaan: {
        ...item.pemeriksaan,

        bb: Number(item.pemeriksaan.bb),

        tb: Number(item.pemeriksaan.tb),
      },
    })
  );

  return {
    rekomendasi: serializedRecommendation,
    currentPage: page,
    totalPages: Math.ceil(total / PAGE_SIZE),
    totalData: total,
  };
}