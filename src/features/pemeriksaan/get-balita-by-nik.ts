"use server";

import { db } from "@/lib/db";

export async function getBalitaByNik(
  nikAnak: string
) {
  if (!nikAnak) return null;

  const balita = await db.balita.findUnique({
    where: {
      nik_anak: nikAnak,
    },

    include: {
      orang_tua: {
        select: {
          nokk: true,
          nama_ayah: true,
          nama_ibu: true,
        },
      },
    },
  });

  if (!balita) return null;

  return {
    ...balita,

    bblahir: balita.bblahir
      ? Number(balita.bblahir)
      : null,

    tblahir: balita.tblahir
      ? Number(balita.tblahir)
      : null,
  };
}