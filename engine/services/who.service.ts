import weightForAge from "../../src/engine/data/weight-for-age.json";
import lengthForAge from "../../src/engine/data/length-for-age.json";
import heightForAge from "../../src/engine/data/height-for-age.json";

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
   *
   * Laki-laki → L
   * Perempuan → P
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
        throw new Error(
          `Gender tidak valid: ${gender}`
        );
    }
  }

  /**
   * Mencari reference terdekat berdasarkan tinggi.
   *
   * Digunakan untuk:
   * - BB/PB
   * - BB/TB
   */
  private findNearestReference<
    T extends { height?: number }
  >(
    dataset: T[],
    height: number
  ): T | undefined {
    if (dataset.length === 0) {
      return undefined;
    }

    return dataset.reduce((closest, current) => {
      if (closest.height === undefined) {
        return current;
      }

      if (current.height === undefined) {
        return closest;
      }

      const currentDiff = Math.abs(
        current.height - height
      );

      const closestDiff = Math.abs(
        closest.height - height
      );

      return currentDiff < closestDiff
        ? current
        : closest;
    });
  }

  /**
   * ==========================================
   * BB/U
   * ==========================================
   *
   * Weight-for-Age
   */
  getWeightReference(
    gender: string,
    umur: number
  ) {
    const normalizedGender =
      this.normalizeGender(gender);

    return weightForAge.find(
      (item) =>
        item.gender === normalizedGender &&
        item.umur === umur
    );
  }

  /**
   * ==========================================
   * TB/U - LENGTH
   * ==========================================
   *
   * Length-for-Age
   *
   * Digunakan untuk umur < 24 bulan.
   */
  getLengthReference(
    gender: string,
    umur: number
  ) {
    const normalizedGender =
      this.normalizeGender(gender);

    return lengthForAge.find(
      (item) =>
        item.gender === normalizedGender &&
        item.umur === umur
    );
  }

  /**
   * ==========================================
   * TB/U - HEIGHT
   * ==========================================
   *
   * Height-for-Age
   *
   * Digunakan untuk umur >= 24 bulan.
   */
  getHeightReference(
    gender: string,
    umur: number
  ) {
    const normalizedGender =
      this.normalizeGender(gender);

    return heightForAge.find(
      (item) =>
        item.gender === normalizedGender &&
        item.umur === umur
    );
  }

  /**
   * ==========================================
   * TB/U - LENGTH / HEIGHT
   * ==========================================
   *
   * Menentukan dataset TB/U berdasarkan umur.
   *
   * < 24 bulan
   * → Length-for-Age
   *
   * >= 24 bulan
   * → Height-for-Age
   */
  getLengthOrHeightReference(
    gender: string,
    umurBulan: number
  ) {
    if (umurBulan < 24) {
      return this.getLengthReference(
        gender,
        umurBulan
      );
    }

    return this.getHeightReference(
      gender,
      umurBulan
    );
  }

  /**
   * ==========================================
   * DATASET BB/PB
   * ==========================================
   *
   * Mengambil dataset berdasarkan gender.
   */
  private getWeightForLengthDataset(
    gender: "L" | "P"
  ) {
    return gender === "L"
      ? weightForLengthBoys
      : weightForLengthGirls;
  }

  /**
   * ==========================================
   * DATASET BB/TB
   * ==========================================
   *
   * Mengambil dataset berdasarkan gender.
   */
  private getWeightForHeightDataset(
    gender: "L" | "P"
  ) {
    return gender === "L"
      ? weightForHeightBoys
      : weightForHeightGirls;
  }

  /**
   * ==========================================
   * BB/PB
   * ==========================================
   *
   * Weight-for-Length
   *
   * Digunakan untuk anak < 24 bulan.
   */
  getWeightForLengthReference(
    gender: string,
    tinggi: number
  ) {
    const normalizedGender =
      this.normalizeGender(gender);

    const dataset =
      this.getWeightForLengthDataset(
        normalizedGender
      );

    return this.findNearestReference(
      dataset,
      tinggi
    );
  }

  /**
   * ==========================================
   * BB/TB
   * ==========================================
   *
   * Weight-for-Height
   *
   * Digunakan untuk anak >= 24 bulan.
   */
  getWeightForHeightReference(
    gender: string,
    tinggi: number
  ) {
    const normalizedGender =
      this.normalizeGender(gender);

    const dataset =
      this.getWeightForHeightDataset(
        normalizedGender
      );

    return this.findNearestReference(
      dataset,
      tinggi
    );
  }

  /**
   * ==========================================
   * BB/PB atau BB/TB
   * ==========================================
   *
   * Menentukan dataset berdasarkan umur.
   *
   * < 24 bulan
   * → BB/PB
   *
   * >= 24 bulan
   * → BB/TB
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