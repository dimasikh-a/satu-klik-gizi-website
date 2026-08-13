import { whoService } from "../services/who.service";
import { WeightForAgeStatus } from "../types/growth";

interface WeightForAgeInput {
  gender: string;
  umur: number;
  berat: number;
}

export function calculateWeightForAge({
  gender,
  umur,
  berat,
}: WeightForAgeInput): WeightForAgeStatus {
  console.log("===== ENGINE BB/U =====");
  console.log({
    gender,
    umur,
    berat,
  });

  const reference = whoService.getWeightReference(
    gender,
    umur
  );

  if (!reference) {
    throw new Error(
      `Referensi WHO BB/U tidak ditemukan (Gender: ${gender}, Umur: ${umur})`
    );
  }

  console.log("WHO :", reference);

  if (berat < reference.minus3) {
    return WeightForAgeStatus.VERY_UNDERWEIGHT;
  }

  if (berat < reference.minus2) {
    return WeightForAgeStatus.UNDERWEIGHT;
  }

  if (berat <= reference.plus1) {
    return WeightForAgeStatus.NORMAL;
  }

  return WeightForAgeStatus.RISK_OVERWEIGHT;
}