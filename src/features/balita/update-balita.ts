"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function updateBalita(
  idbalita: number,
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

  const parsedDate = new Date(tanggallahir);

  if (isNaN(parsedDate.getTime())) {
    return {
      error: "Tanggal lahir tidak valid.",
    };
  }

  try {
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
    // Cek NIK Anak
    // ==========================
    if (nik_anak) {
      const existingBalita = await db.balita.findFirst({
        where: {
          nik_anak,
          NOT: {
            idbalita,
          },
        },
      });

      if (existingBalita) {
        return {
          error: "NIK anak sudah digunakan.",
        };
      }
    }

    // ==========================
    // Update Data
    // ==========================
    await db.balita.update({
      where: {
        idbalita,
      },
      data: {
        id_orang_tua: parent.id_orang_tua,
        nokk,

        nik_anak,
        namaanak,
        jeniskelamin,

        tanggallahir: parsedDate,

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
      success: "Data balita berhasil diperbarui.",
    };
  } catch (error) {
    console.error("UPDATE BALITA ERROR:", error);

    return {
      error: "Gagal memperbarui data balita.",
    };
  }
}