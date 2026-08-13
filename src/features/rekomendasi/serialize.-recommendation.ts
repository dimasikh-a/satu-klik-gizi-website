import {
  RekomendasiClient,
  RekomendasiWithRelations,
} from "./types";

/**
 * Prisma Decimal -> number
 */
export function serializeRekomendasi(data: any[]) {
  return data.map((item) => ({
    ...item,

    bb: Number(item.bb),
    tb: Number(item.tb),

    lingkarkepala: item.lingkarkepala
      ? Number(item.lingkarkepala)
      : null,

    lingkarlengan: item.lingkarlengan
      ? Number(item.lingkarlengan)
      : null,

    lingkarpaha: item.lingkarpaha
      ? Number(item.lingkarpaha)
      : null,
  }));
}