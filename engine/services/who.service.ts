import weightForAge from "../../src/engine/data/weight-for-age.json";
import lengthForAge from "../../src/engine/data/length-for-age.json";

import weightForLengthBoys from "../../src/engine/data/weight-for-length-boys.json";
import weightForLengthGirls from "../../src/engine/data/weight-for-length-girls.json";

import weightForHeightBoys from "../../src/engine/data/weight-for-height-boys.json";
import weightForHeightGirls from "../../src/engine/data/weight-for-height-girls.json";

export interface WHOReference {
  gender: "L" | "P";
  umur?: number;
  height?: number;

  minus3: number;
  minus2: number;
  minus1: number;
  median: number;
  plus1: number;
  plus2: number;
  plus3: number;
}

class WHOService {
  /**
   * Normalisasi gender
   */
  normalizeGender(gender: string): "L" | "P" {
    const value = gender.trim().toLowerCase();

    switch (value) {
      case "l":
      case "laki":
      case "laki-laki":
        return "L";

      case "p":
      case "perempuan":
        return "P";

      default:
        throw new Error(`Gender tidak valid: ${gender}`);
    }
  }

  /**
   * Membulatkan tinggi ke interval 0.5 cm
   * Contoh:
   * 70.1 -> 70.0
   * 70.3 -> 70.5
   */
private findNearestReference<T extends { height?: number }>(
  dataset: T[],
  height: number
): T | undefined {
  if (dataset.length === 0) return undefined;

  return dataset.reduce((closest, current) => {
    if (closest.height === undefined) return current;
    if (current.height === undefined) return closest;

    const currentDiff = Math.abs(current.height - height);
    const closestDiff = Math.abs(closest.height - height);

    return currentDiff < closestDiff ? current : closest;
  });
}

  /**
   * BB/U
   */
  getWeightReference(gender: string, umur: number) {
    const normalizedGender = this.normalizeGender(gender);

    return weightForAge.find(
      (item) =>
        item.gender === normalizedGender &&
        item.umur === umur
    );
  }

  /**
   * TB/U
   */
  getLengthReference(gender: string, umur: number) {
    const normalizedGender = this.normalizeGender(gender);

    return lengthForAge.find(
      (item) =>
        item.gender === normalizedGender &&
        item.umur === umur
    );
  }

  /**
   * Mengambil dataset BB/PB berdasarkan gender
   */
  private getWeightForLengthDataset(gender: "L" | "P") {
    return gender === "L"
      ? weightForLengthBoys
      : weightForLengthGirls;
  }

  /**
   * Mengambil dataset BB/TB berdasarkan gender
   */
  private getWeightForHeightDataset(gender: "L" | "P") {
    return gender === "L"
      ? weightForHeightBoys
      : weightForHeightGirls;
  }

  /**
   * BB/PB (0-24 bulan)
   */
getWeightForLengthReference(
  gender: string,
  tinggi: number
) {
  const normalizedGender = this.normalizeGender(gender);

  const dataset =
    this.getWeightForLengthDataset(normalizedGender);

  return this.findNearestReference(dataset, tinggi);
}

  /**
   * BB/TB (24-60 bulan)
   */
getWeightForHeightReference(
  gender: string,
  tinggi: number
) {
  const normalizedGender = this.normalizeGender(gender);

  const dataset =
    this.getWeightForHeightDataset(normalizedGender);

  return this.findNearestReference(dataset, tinggi);
}

  /**
   * Menentukan referensi BB/PB atau BB/TB berdasarkan umur
   */
  getWeightForLengthOrHeightReference(
    gender: string,
    umurBulan: number,
    tinggi: number
  ) {
    if (umurBulan < 24) {
      return this.getWeightForLengthReference(
        gender,
        tinggi
      );
    }

    return this.getWeightForHeightReference(
      gender,
      tinggi
    );
  }
}

export const whoService = new WHOService();