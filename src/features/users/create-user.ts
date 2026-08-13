"use server";

import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";

export async function createUser(
  prevState: any,
  formData: FormData
) {
  const nama = formData.get("nama")?.toString().trim();
  const alamat = formData.get("alamat")?.toString().trim();
  const telepon = formData.get("telepon")?.toString().trim();
  const password = formData.get("password")?.toString().trim();
  const status = formData.get("status")?.toString();
  const jabatan = formData.get("jabatan")?.toString();

  // VALIDASI
  if (
    !nama ||
    !alamat ||
    !telepon ||
    !password ||
    !status ||
    !jabatan
  ) {
    return {
      error: "Semua field wajib diisi",
    };
  }

  if (password.length < 8) {
    return {
      error: "Password minimal 8 karakter",
    };
  }

  try {
    // CEK NOMOR TELP
    const existingUser = await db.users.findFirst({
      where: {
        no_telp_hp: telepon,
      },
    });

    if (existingUser) {
      return {
        error: "Nomor telepon sudah digunakan",
      };
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    await db.users.create({
      data: {
        nama_user: nama,
        alamat_user: alamat,
        no_telp_hp: telepon,
        password: hashedPassword,
        status,
        jabatan,
      },
    });

    revalidatePath(
      "/admin/dashboard/data-user"
    );

    return {
      success: "Data user berhasil ditambahkan",
    };
  } catch (error) {
    console.error(error);

    return {
      error: "Terjadi kesalahan pada server",
    };
  }
}