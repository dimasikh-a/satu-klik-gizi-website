import { whoService } from "../services/who.service";

export enum WeightForHeightStatus {
  SEVERE_WASTING = "Gizi Buruk",
  WASTING = "Gizi Kurang",
  NORMAL = "Gizi Baik",
  RISK_OVERWEIGHT = "Berisiko Gizi Lebih",
  OVERWEIGHT = "Gizi Lebih",
  OBESITY = "Obesitas",
}

interface CalculateWeightForHeightInput {
  gender: string;
  umurBulan: number;
  tinggi: number;
  berat: number;
}

export function calculateWeightForHeight({
  gender,
  umurBulan,
  tinggi,
  berat,
}: CalculateWeightForHeightInput): WeightForHeightStatus {
  // Ambil referensi WHO sesuai umur
  // < 24 bulan  -> Weight-for-Length
  // >=24 bulan  -> Weight-for-Height
  const reference =
    whoService.getWeightForLengthOrHeightReference(
      gender,
      umurBulan,
      tinggi
    );

  if (!reference) {
    throw new Error(
      `Referensi WHO BB/TB tidak ditemukan (Gender: ${gender}, Umur: ${umurBulan}, Tinggi: ${tinggi})`
    );
  }

  // < -3 SD
  if (berat < reference.minus3) {
    return WeightForHeightStatus.SEVERE_WASTING;
  }

  // -3 SD s/d < -2 SD
  if (berat >= reference.minus3 && berat < reference.minus2) {
    return WeightForHeightStatus.WASTING;
  }

  // -2 SD s/d +1 SD
  if (berat >= reference.minus2 && berat <= reference.plus1) {
    return WeightForHeightStatus.NORMAL;
  }

  // > +1 SD s/d +2 SD
  if (berat > reference.plus1 && berat <= reference.plus2) {
    return WeightForHeightStatus.RISK_OVERWEIGHT;
  }

  // > +2 SD s/d +3 SD
  if (berat > reference.plus2 && berat <= reference.plus3) {
    return WeightForHeightStatus.OVERWEIGHT;
  }

  // > +3 SD
  return WeightForHeightStatus.OBESITY;
}