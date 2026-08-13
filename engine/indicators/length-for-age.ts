import { normalizeGender } from "@/lib/who/normalize-gender";

import { whoService } from "../services/who.service";
import { LengthForAgeStatus } from "../types/growth";

interface LengthForAgeInput {
  gender: string;
  umur: number;
  tinggi: number;
}

export function calculateLengthForAge({
  gender,
  umur,
  tinggi,
}: LengthForAgeInput): LengthForAgeStatus {
  console.log("===== ENGINE TB/U =====");
  console.log({
    gender,
    umur,
    tinggi,
  });

  const normalizedGender = normalizeGender(gender);

  console.log("Normalized :", normalizedGender);

  const reference = whoService.getLengthReference(
    normalizedGender,
    umur
  );

  if (!reference) {
    throw new Error(
      `Referensi WHO TB/U tidak ditemukan (Gender: ${normalizedGender}, Umur: ${umur})`
    );
  }

  console.log("WHO :", reference);

  if (tinggi < reference.minus3) {
    return LengthForAgeStatus.VERY_SHORT;
  }

  if (tinggi < reference.minus2) {
    return LengthForAgeStatus.SHORT;
  }

  if (tinggi <= reference.plus3) {
    return LengthForAgeStatus.NORMAL;
  }

  return LengthForAgeStatus.TALL;
}