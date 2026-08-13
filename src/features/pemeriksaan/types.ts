import { Prisma } from "@prisma/client";

/* ============================================================
 * BALITA
 * ============================================================ */

export type BalitaOption = Prisma.balitaGetPayload<{
  select: {
    idbalita: true;
    nik_anak: true;
    namaanak: true;
    jeniskelamin: true;
    tanggallahir: true;
    bblahir: true;
    tblahir: true;

    orang_tua: {
      select: {
        nama_ayah: true;
        nama_ibu: true;
      };
    };
  };
}>;

/* ============================================================
 * PEMERIKSAAN (SERVER)
 * Digunakan hanya di Server Component / Server Action
 * ============================================================ */

export type PemeriksaanWithRelations =
  Prisma.pemeriksaanGetPayload<{
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
  }>;

/* ============================================================
 * PEMERIKSAAN (CLIENT)
 * Decimal -> number
 * ============================================================ */

export type PemeriksaanClient = Omit<
  PemeriksaanWithRelations,
  | "bb"
  | "tb"

> & {
  bb: number;
  tb: number;

};

/* ============================================================
 * SERIALIZER
 * Prisma Decimal -> number
 * ============================================================ */

export function serializePemeriksaan(
  data: PemeriksaanWithRelations
): PemeriksaanClient {
  return {
    ...data,

    bb: Number(data.bb),
    tb: Number(data.tb),
    cara_pengukuran : String(data.cara_pengukuran)

  };
}