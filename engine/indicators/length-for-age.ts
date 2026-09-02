import { normalizeGender } from "../../src/lib/who/normalize-gender";
import { whoService } from "../services/who.service";
import { LengthForAgeStatus } from "../types/growth";

interface LengthForAgeInput {
  gender: string;
  umur: number;
  tinggi: number;
  caraPengukuran: string;
}

export function calculateLengthForAge({
  gender,
  umur,
  tinggi,
  caraPengukuran,
}: LengthForAgeInput): LengthForAgeStatus {
  console.log("===== ENGINE TB/U =====");

  console.log({
    gender,
    umur,
    tinggi,
    caraPengukuran,
  });

  const normalizedGender =
    normalizeGender(gender);

  console.log(
    "Normalized Gender:",
    normalizedGender
  );

  const cara = caraPengukuran
    .trim()
    .toLowerCase();

  /**
   * ==========================================
   * VALIDASI CARA PENGUKURAN
   * ==========================================
   */

  if (cara !== "terlentang" && cara !== "berdiri") {
    throw new Error(
      `Cara pengukuran tidak valid: ${caraPengukuran}`
    );
  }

  /**
   * ==========================================
   * KONVERSI PENGUKURAN
   * ==========================================
   *
   * < 24 bulan:
   *   indikator = Length-for-Age
   *
   * >= 24 bulan:
   *   indikator = Height-for-Age
   *
   * Jika metode pengukuran tidak sesuai,
   * lakukan koreksi 0.7 cm.
   */

  let nilaiPengukuran = tinggi;

  if (umur < 24) {
    /**
     * Anak < 24 bulan menggunakan
     * Length-for-Age.
     *
     * Jika diukur berdiri:
     * tinggi + 0.7 cm
     */
    if (cara === "berdiri") {
      nilaiPengukuran = tinggi + 0.7;
    }

    console.log(
      "Indikator: LENGTH-FOR-AGE"
    );
  } else {
    /**
     * Anak >= 24 bulan menggunakan
     * Height-for-Age.
     *
     * Jika diukur terlentang:
     * panjang - 0.7 cm
     */
    if (cara === "terlentang") {
      nilaiPengukuran = tinggi - 0.7;
    }

    console.log(
      "Indikator: HEIGHT-FOR-AGE"
    );
  }

  console.log(
    "Nilai pengukuran setelah koreksi:",
    nilaiPengukuran
  );

  /**
   * ==========================================
   * AMBIL REFERENSI WHO
   * ==========================================
   */

  const reference =
    whoService.getLengthOrHeightReference(
      normalizedGender,
      umur
    );

  if (!reference) {
    throw new Error(
      `Referensi WHO TB/U tidak ditemukan ` +
        `(Gender: ${normalizedGender}, Umur: ${umur})`
    );
  }

  console.log("WHO Reference:", reference);

  /**
   * ==========================================
   * KLASIFIKASI TB/U
   * ==========================================
   */

  if (
    nilaiPengukuran <
    reference.minus3
  ) {
    return LengthForAgeStatus.VERY_SHORT;
  }

  if (
    nilaiPengukuran <
    reference.minus2
  ) {
    return LengthForAgeStatus.SHORT;
  }

  if (
    nilaiPengukuran <=
    reference.plus3
  ) {
    return LengthForAgeStatus.NORMAL;
  }

  return LengthForAgeStatus.TALL;
}