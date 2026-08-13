import { Prisma } from "@prisma/client";

/* ============================================================
 * BALITA OPTION
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
 * PEMERIKSAAN LIST SERVER
 * ============================================================ */

export type PemeriksaanListServer =
  Prisma.pemeriksaanGetPayload<{
    include: {
      balita: {
        select: {
          namaanak: true;
          nik_anak: true;
          jeniskelamin: true;
          tanggallahir: true;

          orang_tua: {
            select: {
              nama_ibu: true;
              nama_ayah: true;
            };
          };
        };
      };

      rekomendasi: true;
    };
  }>;

/* ============================================================
 * PEMERIKSAAN LIST CLIENT
 * Decimal -> number
 * ============================================================ */

export type PemeriksaanList = Omit<
  PemeriksaanListServer,
  "bb" | "tb"
> & {
  bb: number;
  tb: number;
};

/* ============================================================
 * PEMERIKSAAN DETAIL SERVER
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

      rekomendasi: true;
    };
  }>;

/* ============================================================
 * PEMERIKSAAN DETAIL CLIENT
 * ============================================================ */

export type PemeriksaanClient = Omit<
  PemeriksaanWithRelations,
  "bb" | "tb"
> & {
  bb: number;
  tb: number;
};

/* ============================================================
 * SERIALIZER DETAIL
 * ============================================================ */

export function serializePemeriksaan(
  data: PemeriksaanWithRelations
): PemeriksaanClient {
  return {
    ...data,

    bb: Number(data.bb),
    tb: Number(data.tb),

    cara_pengukuran: String(
      data.cara_pengukuran ?? ""
    ),
  };
}

/* ============================================================
 * SERIALIZER LIST
 * ============================================================ */

export function serializePemeriksaanList(
  data: PemeriksaanListServer[]
): PemeriksaanList[] {
  return data.map((item) => ({
    ...item,

    bb: Number(item.bb),
    tb: Number(item.tb),

    cara_pengukuran: String(
      item.cara_pengukuran ?? ""
    ),
  }));
}