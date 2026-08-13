type Props = {
  bulan: number;
  tahun: number;
};

const months = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

export default function ReportHeaderPeriode({
  bulan,
  tahun,
}: Props) {
  const namaBulan =
    months[bulan - 1] ?? "-";

  return (
    <div className="mb-8">
      <h2 className="text-center text-xl font-bold">
        LAPORAN PEMANTAUAN
      </h2>

      <h3 className="mt-1 text-center text-lg font-semibold">
        PERTUMBUHAN BALITA
      </h3>

      <div className="mt-6 grid grid-cols-[220px_1fr] gap-y-2 text-sm">
        <span className="font-semibold">
          Provinsi
        </span>

        <span>
          : Banten
        </span>

        <span className="font-semibold">
          Kelurahan/Kota
        </span>

        <span>
          : Tangerang Selatan
        </span>

        <span className="font-semibold">
          Puskesmas/Kecamatan
        </span>

        <span>
          : Pamulang
        </span>

        <span className="font-semibold">
          Desa/Kelurahan
        </span>

        <span>
          : Pamulang Timur
        </span>

        <span className="mt-3 font-semibold">
          Nama Posyandu
        </span>

        <span className="mt-3">
          : Gurame
        </span>

        <span className="font-semibold">
          Bulan
        </span>

        <span>
          : {namaBulan}
        </span>

        <span className="font-semibold">
          Tahun
        </span>

        <span>
          : {tahun}
        </span>
      </div>
    </div>
  );
}