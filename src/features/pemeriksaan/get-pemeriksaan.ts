import { Prisma } from "@prisma/client";
import { db } from "@/lib/db";

const PAGE_SIZE = 5;

export async function getPemeriksaan(
  search?: string,
  page: number = 1
) {
  const keyword = search?.trim();

  const where: Prisma.pemeriksaanWhereInput = {
    is_active: true,
  };

  if (keyword) {
    where.OR = [
      {
        balita: {
          namaanak: {
            contains: keyword,
            mode: "insensitive",
          },
        },
      },
      {
        balita: {
          nik_anak: {
            contains: keyword,
          },
        },
      },
      {
        statusbb: {
          contains: keyword,
          mode: "insensitive",
        },
      },
      {
        statustb: {
          contains: keyword,
          mode: "insensitive",
        },
      },
    ];
  }

  const total = await db.pemeriksaan.count({
    where,
  });

  const data = await db.pemeriksaan.findMany({
    where,

    include: {
      balita: {
        select: {
          namaanak: true,
          nik_anak: true,
          jeniskelamin: true,
          tanggallahir: true,

          orang_tua: {
            select: {
              nama_ibu: true,
              nama_ayah: true,
            },
          },
        },
      },

      rekomendasi_bb: {
        select: {
          kategori: true,
          deskripsi: true,
        },
      },

      rekomendasi_tb: {
        select: {
          kategori: true,
          deskripsi: true,
        },
      },
    },

    orderBy: {
      idperiksa: "desc",
    },

    skip: (page - 1) * PAGE_SIZE,

    take: PAGE_SIZE,
  });

  const pemeriksaan = data.map((item) => ({
    ...item,

    bb: Number(item.bb),

    tb: Number(item.tb),
    cara_pengukuran: String(item.cara_pengukuran),

  }));

  return {
    pemeriksaan,
    totalPages: Math.ceil(total / PAGE_SIZE),
    currentPage: page,
    totalData: total,
  };
}