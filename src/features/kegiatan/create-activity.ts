"use server";

import { writeFile } from "fs/promises";
import path from "path";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function createActivity(
  prevState: any,
  formData: FormData
) {

  const judul_kegiatan =
  formData
    .get("judul_kegiatan")
    ?.toString()
    .trim();

  const foto = formData.get("foto") as File;

  const tanggal_pelaksanaan = formData
    .get("tanggal_pelaksanaan")
    ?.toString();

  const jam = formData
    .get("jam")
    ?.toString()
    .trim();

  const tempat = formData
    .get("tempat")
    ?.toString()
    .trim();

  const keterangan = formData
    .get("keterangan")
    ?.toString()
    .trim();

  // VALIDASI
  if (
    !judul_kegiatan ||
    !tanggal_pelaksanaan ||
    !jam ||
    !tempat
  ) {
    return {
      error:
        "Tanggal pelaksanaan, jam, dan tempat wajib diisi",
    };
  }

  try {
    const parsedDate = new Date(
      tanggal_pelaksanaan
    );

    if (isNaN(parsedDate.getTime())) {
      return {
        error:
          "Tanggal pelaksanaan tidak valid",
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

    await db.kegiatan.create({
      data: {

        judul_kegiatan: judul_kegiatan,
        foto: fotoPath,

        tanggal_pelaksanaan:
          parsedDate,

        jam,

        tempat,

        keterangan:
          keterangan || null,
      },
    });

    revalidatePath(
      "/admin/dashboard/data-kegiatan"
    );

    return {
      success:
        "Data kegiatan berhasil ditambahkan",
    };
  } catch (error) {
    console.error(
      "CREATE KEGIATAN ERROR:",
      error
    );

    return {
      error:
        "Terjadi kesalahan pada server",
    };
  }
}