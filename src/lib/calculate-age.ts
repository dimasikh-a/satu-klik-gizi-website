export function hitungUmurBulan(
  tanggalLahir: Date,
  tanggalPeriksa: Date
): number {
  const tahun =
    tanggalPeriksa.getFullYear() -
    tanggalLahir.getFullYear();

  const bulan =
    tanggalPeriksa.getMonth() -
    tanggalLahir.getMonth();

  return tahun * 12 + bulan;
}