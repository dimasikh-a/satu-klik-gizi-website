import {
  PemeriksaanClient,
  PemeriksaanWithRelations,
} from "./types";

/**
 * Mengubah Prisma Decimal menjadi number
 * agar dapat dikirim dari Server Component
 * ke Client Component.
 */
export function serializePemeriksaan(
  data: PemeriksaanWithRelations
): PemeriksaanClient {
  return {
    ...data,

    bb: Number(data.bb),
    tb: Number(data.tb),
  };
}
/**
 * Serialize array pemeriksaan.
 */
export function serializePemeriksaanList(
  data: PemeriksaanWithRelations[]
): PemeriksaanClient[] {
  return data.map(serializePemeriksaan);
}