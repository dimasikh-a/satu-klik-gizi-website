"use server";

import { db } from "@/lib/db";

export async function generateLaporanPeriode(
  prevState: any,
  formData: FormData
) {
  const bulan = Number(formData.get("bulan"));
  const tahun = Number(formData.get("tahun"));

  // ================================
  // VALIDASI
  // ================================

  if (!bulan) {
    return {
      error: "Bulan wajib dipilih.",
    };
  }

  if (!tahun) {
    return {
      error: "Tahun wajib dipilih.",
    };
  }

  if (bulan < 1 || bulan > 12) {
    return {
      error: "Bulan tidak valid.",
    };
  }

  try {
    // ================================
    // RANGE TANGGAL
    // ================================

    const startDate = new Date(
      tahun,
      bulan - 1,
      1
    );

    const endDate = new Date(
      tahun,
      bulan,
      1
    );

    // ================================
    // AMBIL DATA PEMERIKSAAN
    // ================================

  const pemeriksaan =
  await db.pemeriksaan.findMany({
    where: {
      is_active: true,

      tglperiksa: {
        gte: startDate,
        lt: endDate,
      },
    },

    include: {
      balita: {
        include: {
          orang_tua: true,
        },
      },
    },

    orderBy: {
      tglperiksa: "asc",
    },
  });

// ========================================
// DEBUG BUKU KIA & IMD
// ========================================

console.log(
  "DATA BUKU KIA & IMD:",
  pemeriksaan.map((item) => ({
    nama: item.balita.namaanak,
    buku_kia: item.balita.buku_kia,
    imd: item.balita.imd,
  }))
);

    // ================================
    // DATA KOSONG
    // ================================

    if (pemeriksaan.length === 0) {
      return {
        error: `Tidak ada data pemeriksaan pada bulan ${bulan}/${tahun}.`,
      };
    }

    // ================================
    // FORMAT DATA
    // ================================

    const data = pemeriksaan.map((item) => {
      /**
       * ASI EKSKLUSIF
       *
       * Database:
       * asi_eksklusif String?
       *
       * Contoh:
       * "1,2,3"
       *
       * Akan menjadi:
       * asi_bulan_1 = true
       * asi_bulan_2 = true
       * asi_bulan_3 = true
       */

      const asiBulan =
        item.asi_eksklusif
          ?.split(",")
          .map((value) => Number(value.trim()))
          .filter((value) => !Number.isNaN(value)) ?? [];

      return {
        // ==============================
        // PEMERIKSAAN
        // ==============================

        idperiksa: item.idperiksa,

        idbalita: item.idbalita,

        tglperiksa:
          item.tglperiksa.toISOString(),

        bb: Number(item.bb),

        tb: Number(item.tb),

        cara_pengukuran:
          item.cara_pengukuran,

        asi_eksklusif:
          item.asi_eksklusif,

        asi_bulan_0:
          asiBulan.includes(0),

        asi_bulan_1:
          asiBulan.includes(1),

        asi_bulan_2:
          asiBulan.includes(2),

        asi_bulan_3:
          asiBulan.includes(3),

        asi_bulan_4:
          asiBulan.includes(4),

        asi_bulan_5:
          asiBulan.includes(5),

        statusbb:
          item.statusbb,

        statustb:
          item.statustb,

        hasilgizi:
          item.hasilgizi,

        umur_bulan:
          item.umur_bulan,

        // ==============================
        // BALITA
        // ==============================

        balita: {
          idbalita:
            item.balita.idbalita,

          id_orang_tua:
            item.balita.id_orang_tua,

          nokk:
            item.balita.nokk,

          nik_anak:
            item.balita.nik_anak,

          namaanak:
            item.balita.namaanak,

          jeniskelamin:
            item.balita.jeniskelamin,

          tanggallahir:
            item.balita.tanggallahir.toISOString(),

          bblahir:
            item.balita.bblahir !== null
              ? Number(item.balita.bblahir)
              : null,

          tblahir:
            item.balita.tblahir !== null
              ? Number(item.balita.tblahir)
              : null,

          anakke:
            item.balita.anakke,

          imd:
            item.balita.imd,

          buku_kia:
            item.balita.buku_kia,

          is_active:
            item.balita.is_active,

          // ============================
          // ORANG TUA
          // ============================

          orang_tua: {
            id_orang_tua:
              item.balita.orang_tua
                .id_orang_tua,

            nokk:
              item.balita.orang_tua.nokk,

            nik_ayah:
              item.balita.orang_tua.nik_ayah,

            nama_ayah:
              item.balita.orang_tua.nama_ayah,

            nik_ibu:
              item.balita.orang_tua.nik_ibu,

            nama_ibu:
              item.balita.orang_tua.nama_ibu,

            no_telp_hp:
              item.balita.orang_tua.no_telp_hp,

            alamat:
              item.balita.orang_tua.alamat,

            rt:
              item.balita.orang_tua.rt,

            rw:
              item.balita.orang_tua.rw,
          },
        },

        // ==============================
        // DEFAULT LAPORAN
        // ==============================

        vit_a: "-",

        balita_lebih_5_tahun: "-",
      };
    });

    // ================================
    // RETURN
    // ================================

    return {
      success:
        "Data laporan periode berhasil ditemukan.",

      data,

      bulan,

      tahun,
    };
  } catch (error) {
    console.error(
      "GENERATE LAPORAN PERIODE ERROR:",
      error
    );

    return {
      error:
        "Terjadi kesalahan saat mengambil laporan periode.",
    };
  }
}