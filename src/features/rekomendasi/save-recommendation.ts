"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";

export type RecommendationState =
  | {
      success: string;
      error?: never;
    }
  | {
      error: string;
      success?: never;
    }
  | null;

export async function createRekomendasi(
  idperiksa: number,
  _prevState: RecommendationState,
  formData: FormData
): Promise<RecommendationState> {
  try {
    const deskripsi = formData
      .get("deskripsi")
      ?.toString()
      .trim();

    if (!deskripsi) {
      return {
        error: "Rekomendasi wajib diisi.",
      };
    }

    const pemeriksaan =
      await db.pemeriksaan.findUnique({
        where: {
          idperiksa,
        },
      });

    if (!pemeriksaan) {
      return {
        error: "Data pemeriksaan tidak ditemukan.",
      };
    }

    const existing =
      await db.rekomendasi.findUnique({
        where: {
          idperiksa,
        },
      });

    if (existing) {
      await db.rekomendasi.update({
        where: {
          idperiksa,
        },
        data: {
          deskripsi,
        },
      });

      revalidatePath(
        "/admin/dashboard/data-rekomendasi"
      );

      revalidatePath(
        "/admin/dashboard/data-pemeriksaan"
      );

      return {
        success:
          "Rekomendasi berhasil diperbarui.",
      };
    }

    await db.rekomendasi.create({
      data: {
        idperiksa,
        deskripsi,
      },
    });

    revalidatePath(
      "/admin/dashboard/data-rekomendasi"
    );

    revalidatePath(
      "/admin/dashboard/data-pemeriksaan"
    );

    return {
      success:
        "Rekomendasi berhasil ditambahkan.",
    };
  } catch (error) {
    console.error(
      "CREATE REKOMENDASI ERROR:",
      error
    );

    return {
      error:
        "Terjadi kesalahan saat menyimpan rekomendasi.",
    };
  }
}