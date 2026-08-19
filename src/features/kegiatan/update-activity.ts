"use server";

import { mkdir, unlink, writeFile } from "fs/promises";
import path from "path";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function updateActivity(
  id: number,
  prevState: any,
  formData: FormData
) {
  const judul_kegiatan = formData
    .get("judul_kegiatan")
    ?.toString()
    .trim();

  const foto = formData.get("foto") as File | null;

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

  if (
    !judul_kegiatan ||
    !tanggal_pelaksanaan ||
    !jam ||
    !tempat
  ) {
    return {
      error:
        "Judul kegiatan, tanggal pelaksanaan, jam, dan tempat wajib diisi.",
    };
  }

  try {
    const parsedDate = new Date(tanggal_pelaksanaan);

    if (isNaN(parsedDate.getTime())) {
      return {
        error: "Tanggal pelaksanaan tidak valid.",
      };
    }

    const existingActivity = await db.kegiatan.findUnique({
      where: {
        idkegiatan: id,
      },
    });

    if (!existingActivity) {
      return {
        error: "Data kegiatan tidak ditemukan.",
      };
    }

    let fotoPath = existingActivity.foto;

    if (foto && foto.size > 0) {
      const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/webp",
      ];

      if (!allowedTypes.includes(foto.type)) {
        return {
          error:
            "Format foto harus JPG, JPEG, PNG, atau WEBP.",
        };
      }

      const maxSize = 5 * 1024 * 1024;

      if (foto.size > maxSize) {
        return {
          error: "Ukuran foto maksimal 5 MB.",
        };
      }

      const extension =
        foto.name.split(".").pop()?.toLowerCase() || "jpg";

      const fileName = `${Date.now()}-${crypto.randomUUID()}.${extension}`;

      const uploadDir = path.join(
        process.cwd(),
        "public",
        "uploads",
        "kegiatan"
      );

      await mkdir(uploadDir, {
        recursive: true,
      });

      const uploadPath = path.join(
        uploadDir,
        fileName
      );

      const bytes = await foto.arrayBuffer();
      const buffer = Buffer.from(bytes);

      await writeFile(uploadPath, buffer);

      fotoPath = `/uploads/kegiatan/${fileName}`;

      if (existingActivity.foto) {
        try {
          const oldPhotoPath = path.join(
            process.cwd(),
            "public",
            existingActivity.foto
          );

          await unlink(oldPhotoPath);
        } catch (error) {
          console.error(
            "GAGAL MENGHAPUS FOTO LAMA:",
            error
          );
        }
      }
    }

    await db.kegiatan.update({
      where: {
        idkegiatan: id,
      },
      data: {
        judul_kegiatan,
        foto: fotoPath,
        tanggal_pelaksanaan: parsedDate,
        jam,
        tempat,
        keterangan: keterangan || null,
      },
    });

    revalidatePath(
      "/admin/dashboard/data-kegiatan"
    );

    return {
      success:
        "Data kegiatan berhasil diperbarui.",
    };
  } catch (error) {
    console.error(
      "UPDATE KEGIATAN ERROR:",
      error
    );

    return {
      error:
        "Gagal memperbarui data kegiatan.",
    };
  }
}