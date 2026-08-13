import { Prisma } from "@prisma/client";
import { db } from "@/lib/db";

const PAGE_SIZE = 5;

export async function getUsers(
  search?: string,
  page: number = 1
) {
  const keyword = search?.trim();

  const where: Prisma.usersWhereInput = {
    is_active: true,

    status: {
      not: "Admin",
    },
  };

  if (keyword) {
    where.OR = [
      {
        nama_user: {
          contains: keyword,
          mode: "insensitive",
        },
      },
      {
        no_telp_hp: {
          contains: keyword,
        },
      },
      {
        alamat_user: {
          contains: keyword,
          mode: "insensitive",
        },
      },
      {
        jabatan: {
          contains: keyword,
          mode: "insensitive",
        },
      },
    ];
  }

  const total = await db.users.count({
    where,
  });

  const users = await db.users.findMany({
    where,

    orderBy: {
      id_user: "asc",
    },

    skip: (page - 1) * PAGE_SIZE,

    take: PAGE_SIZE,
  });

  return {
    users,
    totalPages: Math.ceil(total / PAGE_SIZE),
    currentPage: page,
    totalData: total,
  };
}