type Props = {
  data: {
    namaanak: string;

    nik_anak: string | null;

    orang_tua: {
      nokk: string;

      nama_ibu: string;
    };
  };
};

export default function ReportHeaderAnak({
  data,
}: Props) {
  return (
    <div className="w-full text-black">
      {/* ========================================
          JUDUL LAPORAN
      ======================================== */}

      <div className="text-center">
        <h2 className="text-xl font-bold uppercase">
          FORMULIR PEMANTAUAN
        </h2>

        <h3 className="mt-1 text-lg font-semibold uppercase">
          PERTUMBUHAN BALITA
        </h3>
      </div>

      {/* ========================================
          IDENTITAS ANAK
      ======================================== */}

      <div
        className="
          mt-6
          grid
          grid-cols-[150px_1fr]
          gap-y-2
          text-sm
        "
      >
        {/* NAMA ANAK */}

        <span className="font-semibold">
          Nama Anak
        </span>

        <span>
          : {data.namaanak || "-"}
        </span>

        {/* NIK ANAK */}

        <span className="font-semibold">
          NIK Anak
        </span>

        <span>
          : {data.nik_anak ?? "-"}
        </span>

        {/* NO KK */}

        <span className="font-semibold">
          No KK
        </span>

        <span>
          : {data.orang_tua?.nokk ?? "-"}
        </span>

        {/* NAMA IBU */}

        <span className="font-semibold">
          Nama Ibu
        </span>

        <span>
          : {data.orang_tua?.nama_ibu ?? "-"}
        </span>

        {/* TAHUN */}

        <span className="font-semibold">
          Tahun
        </span>

        <span>
          : {new Date().getFullYear()}
        </span>
      </div>
    </div>
  );
}