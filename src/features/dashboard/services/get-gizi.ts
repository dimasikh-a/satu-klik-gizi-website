"use server";

import { db } from "@/lib/db";

export async function getStatistikGizi() {
  // ============================================================
  // AMBIL PEMERIKSAAN TERBARU SETIAP BALITA
  // ============================================================

  const pemeriksaanTerbaru =
    await db.pemeriksaan.findMany({
      where: {
        is_active: true,
      },

      orderBy: [
        {
          idbalita: "asc",
        },
        {
          tglperiksa: "desc",
        },
      ],

      distinct: ["idbalita"],

      select: {
        idperiksa: true,
        idbalita: true,
        hasilgizi: true,
      },
    });

  // ============================================================
  // HITUNG KATEGORI HASIL GIZI
  // ============================================================

  const statistik = {
    giziBuruk: 0,
    giziKurang: 0,
    giziBaik: 0,
    berisikoGiziLebih: 0,
    giziLebih: 0,
    obesitas: 0,
  };

  for (const pemeriksaan of pemeriksaanTerbaru) {
    switch (pemeriksaan.hasilgizi) {
      case "Gizi Buruk":
        statistik.giziBuruk++;
        break;

      case "Gizi Kurang":
        statistik.giziKurang++;
        break;

      case "Gizi Baik":
        statistik.giziBaik++;
        break;

      case "Berisiko Gizi Lebih":
        statistik.berisikoGiziLebih++;
        break;

      case "Gizi Lebih":
        statistik.giziLebih++;
        break;

      case "Obesitas":
        statistik.obesitas++;
        break;
    }
  }

  // ============================================================
  // TOTAL BALITA YANG SUDAH MEMILIKI HASIL PEMERIKSAAN
  // ============================================================

  const totalBalita =
    pemeriksaanTerbaru.length;

  return {
    totalBalita,

    giziBuruk:
      statistik.giziBuruk,

    giziKurang:
      statistik.giziKurang,

    giziBaik:
      statistik.giziBaik,

    berisikoGiziLebih:
      statistik.berisikoGiziLebih,

    giziLebih:
      statistik.giziLebih,

    obesitas:
      statistik.obesitas,
  };
}