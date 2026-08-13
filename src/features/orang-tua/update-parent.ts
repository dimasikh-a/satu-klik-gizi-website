"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function updateParent(
  no_kk: string,
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

  try {
    await db.orang_tua.update({
      where: {
        nokk: String(no_kk),
      },
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
        "Data user berhasil diperbarui",
    };
  } catch (error) {
  console.error("UPDATE USER ERROR:", error);

  return {
    error: "Gagal memperbarui data user",
  };
}
}