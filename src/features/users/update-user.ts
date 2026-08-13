"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function updateUser(
  id: number,
  prevState: any,
  formData: FormData
) {
  const nama =
    formData.get("nama")?.toString().trim();

  const alamat =
    formData.get("alamat")?.toString().trim();

  const telepon =
    formData.get("telepon")?.toString().trim();

  const status =
    formData.get("status")?.toString();

  const jabatan =
    formData.get("jabatan")?.toString();

  if (
    !nama ||
    !alamat ||
    !telepon ||
    !status ||
    !jabatan
  ) {
    return {
      error: "Semua field wajib diisi",
    };
  }

  try {
    await db.users.update({
      where: {
        id_user: id,
      },
      data: {
        nama_user: nama,
        alamat_user: alamat,
        no_telp_hp: telepon,
        status,
        jabatan,
      },
    });

    revalidatePath(
      "/admin/dashboard/data-user"
    );

    return {
      success:
        "Data user berhasil diperbarui",
    };
  } catch (error) {
  console.error("UPDATE USER ERROR:", error);

  return {
    error: "Gagal memperbarui data user",
  };
}
}