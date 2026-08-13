"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";

export async function createDataIbu(
  prevState: any,
  formData: FormData
) {
  const nokk = formData.get("nokk")?.toString().trim() ?? "";

  const nik_ayah = formData.get("nikayah")?.toString().trim() ?? "";
  const nama_ayah = formData.get("namaayah")?.toString().trim() ?? "";

  const nik_ibu = formData.get("nikibu")?.toString().trim() ?? "";
  const nama_ibu = formData.get("namaibu")?.toString().trim() ?? "";

  const no_telp_hp = formData.get("notelp")?.toString().trim() ?? "";

  const alamat = formData.get("alamat")?.toString().trim() ?? "";

  const rt = formData.get("rt")?.toString().trim() ?? "";

  const rw = formData.get("rw")?.toString().trim() ?? "";

  // ===========================
  // VALIDASI
  // ===========================


  if (
    !nokk ||
    !nama_ibu ||
    !no_telp_hp ||
    !alamat ||
    !rt ||
    !rw
  ) {
    return {
      error: "Semua field wajib diisi.",
    };
  }

  // Minimal salah satu NIK harus diisi
  if (!nik_ayah && !nik_ibu) {
    return {
      error: "Minimal isi NIK Ayah atau NIK Ibu.",
    };
  }

  try {
    const existingParent =
      await db.orang_tua.findUnique({
        where: {
          nokk,
        },
      });

    if (existingParent) {
      return {
        error: "Nomor KK sudah terdaftar.",
      };
    }

    await db.orang_tua.create({
      data: {
        nokk,

        nik_ayah: nik_ayah || null,
        nama_ayah: nama_ayah || null,

        nik_ibu: nik_ibu,
        nama_ibu,

        no_telp_hp,
        alamat,
        rt,
        rw,
      },
    });

    revalidatePath(
      "/admin/dashboard/data-orang-tua"
    );

    return {
      success:
        "Data orang tua berhasil ditambahkan.",
    };
  } catch (error) {
    console.error(error);

    return {
      error:
        "Terjadi kesalahan pada server.",
    };
  }
}