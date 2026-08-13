
"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function createBalita(
  prevState: any,
  formData: FormData
) {
  // ==========================
  // Ambil Data Form
  // ==========================
  const nokk = formData.get("nokk")?.toString().trim();
  const nik_anak = formData.get("nikanak")?.toString().trim() || null;
  const namaanak = formData.get("namaanak")?.toString().trim();
  const jeniskelamin = formData.get("jeniskelamin")?.toString().trim();
  const tanggallahir = formData.get("tanggallahir")?.toString().trim();

  const bblahir = formData.get("bb")?.toString().trim();
  const tblahir = formData.get("tb")?.toString().trim();
  const anakke = formData.get("anakke")?.toString().trim();

  const imdValue = formData.get("imd")?.toString();
  const bukuKiaValue = formData.get("kpb")?.toString();

  // ==========================
  // Validasi
  // ==========================
  if (
    !nokk ||
    !namaanak ||
    !jeniskelamin ||
    !tanggallahir
  ) {
    return {
      error: "Semua field wajib diisi.",
    };
  }

  try {
    // ==========================
    // Cek NIK Anak
    // ==========================
    if (nik_anak) {
      const existingBalita = await db.balita.findUnique({
        where: {
          nik_anak,
        },
      });

      if (existingBalita) {
        return {
          error: "NIK anak sudah digunakan.",
        };
      }
    }

    // ==========================
    // Cek Orang Tua
    // ==========================
    const parent = await db.orang_tua.findUnique({
      where: {
        nokk,
      },
    });

    if (!parent) {
      return {
        error: "Nomor KK tidak ditemukan.",
      };
    }

    // ==========================
    // Simpan Data
    // ==========================
    await db.balita.create({
      data: {
        id_orang_tua: parent.id_orang_tua,
        nokk,

        nik_anak,
        namaanak,
        jeniskelamin,

        tanggallahir: new Date(tanggallahir),

        bblahir: bblahir ? Number(bblahir) : null,
        tblahir: tblahir ? Number(tblahir) : null,
        anakke: anakke ? Number(anakke) : null,

        imd:
          imdValue === ""
            ? null
            : imdValue === "true",

        buku_kia:
          bukuKiaValue === ""
            ? null
            : bukuKiaValue === "true",
      },
    });

    revalidatePath("/admin/dashboard/data-balita");

    return {
      success: "Data balita berhasil ditambahkan.",
    };
  } catch (error) {
    console.error("CREATE BALITA ERROR:", error);

    return {
      error: "Terjadi kesalahan pada server.",
    };
  }
}
