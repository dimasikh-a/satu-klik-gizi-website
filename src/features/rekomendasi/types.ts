import { Prisma } from "@prisma/client";

/* ============================================================
 * REKOMENDASI (SERVER)
 * Digunakan pada Server Component / Server Action
 * ============================================================ */

export type RekomendasiWithRelations =
  Prisma.rekomendasiGetPayload<{
    include: {
      pemeriksaan: {
        include: {
          balita: {
            include: {
              orang_tua: {
                select: {
                  nama_ayah: true;
                  nama_ibu: true;
                };
              };
            };
          };
        };
      };
    };
  }>;

/* ============================================================
 * REKOMENDASI (CLIENT)
 * Decimal -> number
 * ============================================================ */

export type RekomendasiClient = Omit<
  RekomendasiWithRelations,
  "pemeriksaan"
> & {
  pemeriksaan: Omit<
    RekomendasiWithRelations["pemeriksaan"],
    "bb" | "tb"
  > & {
    bb: number;
    tb: number;
  };
};