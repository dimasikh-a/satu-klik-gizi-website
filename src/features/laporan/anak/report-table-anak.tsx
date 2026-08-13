type ReportTableProps = {
  balita: {
    namaanak: string;
    nik_anak: string | null;
    bblahir: number | null;
    tblahir: number | null;

    orang_tua: {
      nokk: string;
      nama_ibu: string;
    };

    pemeriksaan: {
      idperiksa: number;
      tglperiksa: Date;
      bb: number;
      tb: number;
      statusbb: string | null;
      statustb: string | null;
      hasilgizi: string | null;
    }[];
  };
};

export default function ReportTable({
  balita,
}: ReportTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border border-black text-sm text-black">
        <thead>
          <tr className="bg-gray-100 text-center">
            <th className="border border-black p-2">No</th>
            <th className="border border-black p-2">No KK</th>
            <th className="border border-black p-2">Nama Ibu</th>
            <th className="border border-black p-2">NIK Anak</th>
            <th className="border border-black p-2">Nama Anak</th>
            <th className="border border-black p-2">BB Lahir</th>
            <th className="border border-black p-2">TB Lahir</th>
            <th className="border border-black p-2">
              Tgl Pemeriksaan
            </th>
            <th className="border border-black p-2">TB</th>
            <th className="border border-black p-2">BB</th>
            <th className="border border-black p-2">TB/U</th>
            <th className="border border-black p-2">BB/U</th>
            <th className="border border-black p-2">
              Hasil Gizi
            </th>
          </tr>
        </thead>

        <tbody>
          {balita.pemeriksaan.length === 0 ? (
            <tr>
              <td
                colSpan={13}
                className="border border-black p-4 text-center text-gray-500"
              >
                Belum ada data pemeriksaan.
              </td>
            </tr>
          ) : (
            balita.pemeriksaan.map(
              (item, index) => (
                <tr key={item.idperiksa}>
                  <td className="border border-black p-2 text-center">
                    {index + 1}
                  </td>

                  <td className="border border-black p-2">
                    {balita.orang_tua.nokk}
                  </td>

                  <td className="border border-black p-2">
                    {balita.orang_tua.nama_ibu}
                  </td>

                  <td className="border border-black p-2">
                    {balita.nik_anak ?? "-"}
                  </td>

                  <td className="border border-black p-2">
                    {balita.namaanak}
                  </td>

                  <td className="border border-black p-2 text-center">
                    {balita.bblahir ?? "-"}
                  </td>

                  <td className="border border-black p-2 text-center">
                    {balita.tblahir ?? "-"}
                  </td>

                  <td className="border border-black p-2 text-center">
                    {new Date(
                      item.tglperiksa
                    ).toLocaleDateString("id-ID")}
                  </td>

                  <td className="border border-black p-2 text-center">
                    {Number(item.tb)}
                  </td>

                  <td className="border border-black p-2 text-center">
                    {Number(item.bb)}
                  </td>

                  <td className="border border-black p-2 text-center">
                    {item.statustb ?? "-"}
                  </td>

                  <td className="border border-black p-2 text-center">
                    {item.statusbb ?? "-"}
                  </td>

                  <td className="border border-black p-2 text-center">
                    {item.hasilgizi ?? "-"}
                  </td>
                </tr>
              )
            )
          )}
        </tbody>
      </table>
    </div>
  );
}