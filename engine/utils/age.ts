// src/engine/utils/age.ts

export function calculateAgeInMonths(
  birthDate: Date,
  examinationDate: Date
): number {
  let months =
    (examinationDate.getFullYear() - birthDate.getFullYear()) * 12 +
    (examinationDate.getMonth() - birthDate.getMonth());

  // Jika tanggal pemeriksaan belum mencapai tanggal lahir,
  // berarti belum genap satu bulan
  if (examinationDate.getDate() < birthDate.getDate()) {
    months--;
  }

  return Math.max(months, 0);
}