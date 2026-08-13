"use server";
import { writeFile } from "fs/promises";
import path from "path";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function updateUser(
  id: number,
  prevState: any,
  formData: FormData
) {
  const foto = formData.get("foto") as File;

  const judul_kegiatan =
    formData.get("judul_kegiatan")?.toString().trim();
  const tanggal_pelaksanaan =
    formData.get("tanggal_pelaksanaan")?.toString().trim();

  const jam =
    formData.get("jam")?.toString().trim();

  const tempat =
    formData.get("tempat")?.toString().trim();

  const keterangan =
    formData.get("keterangan")?.toString();

  if (
    !tanggal_pelaksanaan ||
    !jam ||
    !tempat ||
    !keterangan
  ) {
    return {
      error: "Semua field wajib diisi",
    };
  }

  let fotoPath: string | null =
    null;
  if (
    foto &&
    foto.size > 0
  ) {
    const bytes =
      await foto.arrayBuffer();

    const buffer =
      Buffer.from(bytes);

    const fileName = `${Date.now()}-${foto.name}`;

    const uploadPath = path.join(
      process.cwd(),
      "public",
      "uploads",
      "kegiatan",
      fileName
    );

    await writeFile(
      uploadPath,
      buffer
    );

    fotoPath =
      `/uploads/kegiatan/${fileName}`;
  }

  try {
    await db.users.update({
      where: {
        id_user: id,
      },
      data: {
        foto: fotoPath,
        judul_kegiatan: judul_kegiatan,
        tanggal_pelaksanaan: tanggal_pelaksanaan,
        jam: jam,
        keterangan: keterangan,
      },
    });

    revalidatePath(
      "/admin/dashboard/data-kegiatan"
    );

    return {
      success:
        "Data user berhasil diperbarui",
    };
  } catch (error) {
    console.error("UPDATE USER ERROR:", error);

    return {
      error: "Gagal memperbarui kegiatan",
    };
  }
}