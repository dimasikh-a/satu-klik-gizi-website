type ReportHeaderPeriodeProps = {
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
}: ReportHeaderPeriodeProps) {
  const namaBulan =
    months[bulan - 1] ?? "-";

  return (
    <div className="mb-8 text-black">
      {/* ================================
          JUDUL
      ================================= */}

      <div className="mb-6 text-center">
        <h2 className="text-xl font-bold uppercase">
          FORMULIR PEMANTAUAN
        </h2>

        <h3 className="text-lg font-bold uppercase">
          PERTUMBUHAN BALITA
        </h3>
      </div>

      {/* ================================
          INFORMASI WILAYAH
      ================================= */}

      <div className="grid grid-cols-2 gap-x-10 gap-y-2 text-sm text-black">
        <div className="flex text-black">
          <span className="w-48 font-medium">
            Provinsi
          </span>

          <span>
            : Banten
          </span>
        </div>

        <div className="flex">
          <span className="w-48 font-medium">
            Kelurahan/Kota
          </span>

          <span>
            : Tangerang Selatan
          </span>
        </div>

        <div className="flex">
          <span className="w-48 font-medium">
            Puskesmas/Kecamatan
          </span>

          <span>
            : Pamulang
          </span>
        </div>

        <div className="flex text-black">
          <span className="w-48 font-medium">
            Desa/Kelurahan
          </span>

          <span>
            : Pamulang Timur
          </span>
        </div>
      </div>

      {/* ================================
          INFORMASI LAPORAN
      ================================= */}

      <div className="mt-4 grid grid-cols-2 gap-x-10 gap-y-2 text-sm">
        <div className="flex">
          <span className="w-48 font-medium">
            Nama Posyandu
          </span>

          <span>
            : Gurame
          </span>
        </div>

        <div className="flex">
          <span className="w-48 font-medium">
            Bulan
          </span>

          <span>
            : {namaBulan}
          </span>
        </div>

        <div className="flex">
          <span className="w-48 font-medium">
            Tahun
          </span>

          <span>
            : {tahun}
          </span>
        </div>
      </div>
    </div>
  );
}