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
    <div className="mb-8">
      <h2 className="text-center text-xl font-bold">
        FORMULIR PEMANTAUAN
      </h2>

      <h3 className="mt-1 text-center text-lg font-semibold">
        PERTUMBUHAN BALITA
      </h3>

      <div className="mt-6 grid grid-cols-[150px_1fr] gap-y-2 text-sm">
        <span className="font-semibold">
          Nama Anak
        </span>

        <span>
          : {data.namaanak}
        </span>

        <span className="font-semibold">
          NIK Anak
        </span>

        <span>
          : {data.nik_anak ?? "-"}
        </span>

        <span className="font-semibold">
          No KK
        </span>

        <span>
          : {data.orang_tua.nokk}
        </span>

        <span className="font-semibold">
          Nama Ibu
        </span>

        <span>
          : {data.orang_tua.nama_ibu}
        </span>

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