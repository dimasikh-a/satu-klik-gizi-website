"use server";

import { db } from "@/lib/db";

export async function generateLaporanAnak(
  prevState: any,
  formData: FormData
) {
  // ========================================
  // AMBIL NIK
  // ========================================

  const nik = formData
    .get("nik")
    ?.toString()
    .trim();

  if (!nik) {
    return {
      error: "NIK Anak wajib diisi.",
    };
  }

  try {
    // ========================================
    // CARI DATA BALITA
    // ========================================

    const balita =
      await db.balita.findUnique({
        where: {
          nik_anak: nik,
        },

        include: {
          // Data orang tua
          orang_tua: true,

          // Hanya pemeriksaan aktif
          pemeriksaan: {
            where: {
              is_active: true,
            },

            // Urutkan dari pemeriksaan
            // paling lama → terbaru
            orderBy: {
              tglperiksa: "asc",
            },
          },
        },
      });

    // ========================================
    // DATA TIDAK DITEMUKAN
    // ========================================

    if (!balita) {
      return {
        error:
          "Data balita tidak ditemukan.",
      };
    }

    // ========================================
    // SERIALIZE DATA
    // Prisma Decimal dan Date tidak boleh
    // langsung dikirim ke Client Component.
    // ========================================

    const data = {
      idbalita: balita.idbalita,

      namaanak: balita.namaanak,

      nik_anak: balita.nik_anak,

      nokk: balita.nokk,

      jeniskelamin:
        balita.jeniskelamin,

      tanggallahir:
        balita.tanggallahir.toISOString(),

      bblahir:
        balita.bblahir !== null
          ? Number(balita.bblahir)
          : null,

      tblahir:
        balita.tblahir !== null
          ? Number(balita.tblahir)
          : null,

      anakke: balita.anakke,

      imd: balita.imd,

      buku_kia: balita.buku_kia,

      is_active: balita.is_active,

      // ====================================
      // ORANG TUA
      // ====================================

      orang_tua: {
        id_orang_tua:
          balita.orang_tua
            .id_orang_tua,

        nokk:
          balita.orang_tua.nokk,

        nik_ayah:
          balita.orang_tua.nik_ayah,

        nama_ayah:
          balita.orang_tua.nama_ayah,

        nik_ibu:
          balita.orang_tua.nik_ibu,

        nama_ibu:
          balita.orang_tua.nama_ibu,

        no_telp_hp:
          balita.orang_tua.no_telp_hp,

        alamat:
          balita.orang_tua.alamat,

        rt: balita.orang_tua.rt,

        rw: balita.orang_tua.rw,
      },

      // ====================================
      // RIWAYAT PEMERIKSAAN
      // ====================================

      pemeriksaan:
        balita.pemeriksaan.map(
          (item) => ({
            idperiksa:
              item.idperiksa,

            tglperiksa:
              item.tglperiksa.toISOString(),

            bb: Number(item.bb),

            tb: Number(item.tb),

            cara_pengukuran:
              item.cara_pengukuran,

            asi_eksklusif:
              item.asi_eksklusif,

            statusbb:
              item.statusbb,

            statustb:
              item.statustb,

            hasilgizi:
              item.hasilgizi,

            umur_bulan:
              item.umur_bulan,

            idrekomendasi_bb:
              item.idrekomendasi_bb,

            idrekomendasi_tb:
              item.idrekomendasi_tb,

            is_active:
              item.is_active,
          })
        ),
    };

    // ========================================
    // RETURN
    // ========================================

    return {
      success:
        "Data laporan anak berhasil ditemukan.",

      data,
    };
  } catch (error) {
    console.error(
      "GENERATE LAPORAN ANAK ERROR:",
      error
    );

    return {
      error:
        "Terjadi kesalahan saat membuat laporan.",
    };
  }
}