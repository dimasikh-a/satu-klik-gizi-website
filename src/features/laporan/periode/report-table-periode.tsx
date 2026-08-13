"use client";

type ReportTablePeriodeProps = {
  data: any[];
};

const formatDate = (value: string | Date | null | undefined) => {
  if (!value) return "-";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "-";
  }

  return date.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

const formatNumber = (value: number | string | null | undefined) => {
  if (value === null || value === undefined || value === "") {
    return "-";
  }

  return Number(value).toString();
};

/**
 * ASI disimpan dalam satu field:
 *
 * asi_eksklusif: String?
 *
 * Contoh kemungkinan value:
 *
 * "0"
 * "0,1,2"
 * "0,1,2,3,4,5"
 * "1,2,3"
 *
 * Fungsi ini mengecek apakah bulan
 * tertentu terdapat di dalam value.
 */
const isAsiSelected = (value: string | null | undefined, bulan: number) => {
  if (!value) return "-";

  const normalized = value
    .split(/[,\s;|]+/)
    .map((item) => item.trim())
    .filter(Boolean);

  if (normalized.includes(bulan.toString())) {
    return "✓";
  }

  return "-";
};

export default function ReportTablePeriode({ data }: ReportTablePeriodeProps) {
  return (
    <div className="w-full overflow-x-auto text-black ">
      <table
        className="
          min-w-[2600px]
          text-black
          w-full
          border-collapse
          border
          border-gray-400
          text-xs
        "
      >
        {/* ==================================================
            HEADER
        ================================================== */}

        <thead>
          {/* HEADER UTAMA */}

          <tr className="bg-gray-100">
            <th
              rowSpan={2}
              className="border border-gray-400 px-3 py-3 text-center"
            >
              No
            </th>

            <th
              rowSpan={2}
              className="border border-gray-400 px-3 py-3 text-center"
            >
              Anak Ke
            </th>

            <th
              rowSpan={2}
              className="border border-gray-400 px-3 py-3 text-center"
            >
              Tanggal Lahir
            </th>

            <th
              rowSpan={2}
              className="border border-gray-400 px-3 py-3 text-center"
            >
              Jenis Kelamin
            </th>

            <th
              rowSpan={2}
              className="border border-gray-400 px-3 py-3 text-center"
            >
              No Kartu
              <br />
              Keluarga
            </th>

            <th
              rowSpan={2}
              className="border border-gray-400 px-3 py-3 text-center"
            >
              NIK
            </th>

            <th
              rowSpan={2}
              className="border border-gray-400 px-3 py-3 text-center"
            >
              Nama Anak
            </th>

            <th
              rowSpan={2}
              className="border border-gray-400 px-3 py-3 text-center"
            >
              BB Lahir
              <br />
              (kg)
            </th>

            <th
              rowSpan={2}
              className="border border-gray-400 px-3 py-3 text-center"
            >
              PB Lahir
              <br />
              (cm)
            </th>

            <th
              rowSpan={2}
              className="border border-gray-400 px-3 py-3 text-center"
            >
              Buku KIA
            </th>

            <th
              rowSpan={2}
              className="border border-gray-400 px-3 py-3 text-center"
            >
              IMD
            </th>

            <th
              rowSpan={2}
              className="border border-gray-400 px-3 py-3 text-center"
            >
              Nama Ayah
            </th>

            <th
              rowSpan={2}
              className="border border-gray-400 px-3 py-3 text-center"
            >
              NIK Ayah
            </th>

            <th
              rowSpan={2}
              className="border border-gray-400 px-3 py-3 text-center"
            >
              No. Telp /
              <br />
              HP Ayah
            </th>

            <th
              rowSpan={2}
              className="border border-gray-400 px-3 py-3 text-center"
            >
              Alamat
            </th>

            <th
              rowSpan={2}
              className="border border-gray-400 px-3 py-3 text-center"
            >
              RT
            </th>

            <th
              rowSpan={2}
              className="border border-gray-400 px-3 py-3 text-center"
            >
              RW
            </th>

            <th
              rowSpan={2}
              className="border border-gray-400 px-3 py-3 text-center"
            >
              Tgl.
              <br />
              Pengukuran
            </th>

            <th
              rowSpan={2}
              className="border border-gray-400 px-3 py-3 text-center"
            >
              BB
              <br />
              (kg)
            </th>

            <th
              rowSpan={2}
              className="border border-gray-400 px-3 py-3 text-center"
            >
              Panjang Badan /
              <br />
              Tinggi Badan
              <br />
              (cm)
            </th>

            <th
              rowSpan={2}
              className="border border-gray-400 px-3 py-3 text-center"
            >
              Cara Ukur
            </th>

            {/* ASI */}

            <th
              colSpan={6}
              className="border border-gray-400 px-3 py-3 text-center"
            >
              ASI Eksklusif
            </th>

            {/* VIT A */}

            <th
              colSpan={2}
              className="border border-gray-400 px-3 py-3 text-center"
            >
              Vit A
            </th>

            <th
              rowSpan={2}
              className="border border-gray-400 px-3 py-3 text-center"
            >
              Umur
            </th>

            <th
              rowSpan={2}
              className="border border-gray-400 px-3 py-3 text-center"
            >
              Balita
              <br />
              &gt;5 Tahun
            </th>
          </tr>

          {/* SUB HEADER */}

          <tr className="bg-gray-50">
            {/* ASI */}

            <th className="border border-gray-400 px-3 py-3 text-center">
              0 bln
            </th>

            <th className="border border-gray-400 px-3 py-3 text-center">
              1 bln
            </th>

            <th className="border border-gray-400 px-3 py-3 text-center">
              2 bln
            </th>

            <th className="border border-gray-400 px-3 py-3 text-center">
              3 bln
            </th>

            <th className="border border-gray-400 px-3 py-3 text-center">
              4 bln
            </th>

            <th className="border border-gray-400 px-3 py-3 text-center">
              5 bln
            </th>

            {/* VIT A */}

            <th className="border border-gray-400 px-3 py-3 text-center">
              Vit A
            </th>

            <th className="border border-gray-400 px-3 py-3 text-center">
              Vit A
            </th>
          </tr>
        </thead>

        {/* ==================================================
            BODY
        ================================================== */}

        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={31}
                className="
                  border
                  border-gray-400
                  px-4
                  py-8
                  text-center
                  text-gray-500
                "
              >
                Tidak ada data pemeriksaan.
              </td>
            </tr>
          ) : (
            data.map((item, index) => {
              const balita = item.balita;

              const orangTua = balita?.orang_tua;

              return (
                <tr key={item.idperiksa ?? index} className="hover:bg-gray-50">
                  {/* 1. NO */}

                  <td className="border border-gray-400 px-3 py-3 text-center">
                    {index + 1}
                  </td>

                  {/* 2. ANAK KE */}

                  <td className="border border-gray-400 px-3 py-3 text-center">
                    {balita?.anakke ?? "-"}
                  </td>

                  {/* 3. TANGGAL LAHIR */}

                  <td className="border border-gray-400 px-3 py-3 text-center whitespace-nowrap">
                    {formatDate(balita?.tanggallahir)}
                  </td>

                  {/* 4. JENIS KELAMIN */}

                  <td className="border border-gray-400 px-3 py-3 text-center">
                    {balita?.jeniskelamin ?? "-"}
                  </td>

                  {/* 5. NO KK */}

                  <td className="border border-gray-400 px-3 py-3">
                    {orangTua?.nokk ?? balita?.nokk ?? "-"}
                  </td>

                  {/* 6. NIK */}

                  <td className="border border-gray-400 px-3 py-3">
                    {balita?.nik_anak ?? "-"}
                  </td>

                  {/* 7. NAMA ANAK */}

                  <td className="border border-gray-400 px-3 py-3 font-medium">
                    {balita?.namaanak ?? "-"}
                  </td>

                  {/* 8. BB LAHIR */}

                  <td className="border border-gray-400 px-3 py-3 text-center">
                    {formatNumber(balita?.bblahir)}
                  </td>

                  {/* 9. PB LAHIR */}

                  <td className="border border-gray-400 px-3 py-3 text-center">
                    {formatNumber(balita?.tblahir)}
                  </td>

                  {/* 10. BUKU KIA */}

                  <td className="border border-gray-400 px-3 py-3 text-center">
                    <td className="px-3 py-3 text-center">
                      {balita?.buku_kia === true
                        ? "Ya"
                        : balita?.buku_kia === false
                          ? "Tidak"
                          : "-"}
                    </td>
                  </td>

                  {/* 11. IMD */}

                  <td className="border border-gray-400 px-3 py-3 text-center">
                    <td className=" px-3 py-3 text-center">
                      {balita?.imd === true
                        ? "Ya"
                        : balita?.imd === false
                          ? "Tidak"
                          : "-"}
                    </td>
                  </td>

                  {/* 12. NAMA AYAH */}

                  <td className="border border-gray-400 px-3 py-3">
                    {orangTua?.nama_ayah ?? "-"}
                  </td>

                  {/* 13. NIK AYAH */}

                  <td className="border border-gray-400 px-3 py-3">
                    {orangTua?.nik_ayah ?? "-"}
                  </td>

                  {/* 14. NO HP AYAH */}

                  <td className="border border-gray-400 px-3 py-3">
                    {orangTua?.no_telp_hp ?? "-"}
                  </td>

                  {/* 15. ALAMAT */}

                  <td className="border border-gray-400 px-3 py-3">
                    {orangTua?.alamat ?? "-"}
                  </td>

                  {/* 16. RT */}

                  <td className="border border-gray-400 px-3 py-3 text-center">
                    {orangTua?.rt ?? "-"}
                  </td>

                  {/* 17. RW */}

                  <td className="border border-gray-400 px-3 py-3 text-center">
                    {orangTua?.rw ?? "-"}
                  </td>

                  {/* 18. TGL PENGUKURAN */}

                  <td className="border border-gray-400 px-3 py-3 text-center whitespace-nowrap">
                    {formatDate(item.tglperiksa)}
                  </td>

                  {/* 19. BB */}

                  <td className="border border-gray-400 px-3 py-3 text-center">
                    {formatNumber(item.bb)}
                  </td>

                  {/* 20. TB */}

                  <td className="border border-gray-400 px-3 py-3 text-center">
                    {formatNumber(item.tb)}
                  </td>

                  {/* 21. CARA UKUR */}

                  <td className="border border-gray-400 px-3 py-3 text-center">
                    {item.cara_pengukuran ?? "-"}
                  </td>

                  {/* 22. ASI 0 BULAN */}

                  <td className="border border-gray-400 px-3 py-3 text-center">
                    {isAsiSelected(item.asi_eksklusif, 0)}
                  </td>

                  {/* 23. ASI 1 BULAN */}

                  <td className="border border-gray-400 px-3 py-3 text-center">
                    {isAsiSelected(item.asi_eksklusif, 1)}
                  </td>

                  {/* 24. ASI 2 BULAN */}

                  <td className="border border-gray-400 px-3 py-3 text-center">
                    {isAsiSelected(item.asi_eksklusif, 2)}
                  </td>

                  {/* 25. ASI 3 BULAN */}

                  <td className="border border-gray-400 px-3 py-3 text-center">
                    {isAsiSelected(item.asi_eksklusif, 3)}
                  </td>

                  {/* 26. ASI 4 BULAN */}

                  <td className="border border-gray-400 px-3 py-3 text-center">
                    {isAsiSelected(item.asi_eksklusif, 4)}
                  </td>

                  {/* 27. ASI 5 BULAN */}

                  <td className="border border-gray-400 px-3 py-3 text-center">
                    {isAsiSelected(item.asi_eksklusif, 5)}
                  </td>

                  {/* 28. VIT A */}

                  <td className="border border-gray-400 px-3 py-3 text-center">
                    -
                  </td>

                  {/* 29. VIT A */}

                  <td className="border border-gray-400 px-3 py-3 text-center">
                    -
                  </td>

                  {/* 30. UMUR */}

                  <td className="border border-gray-400 px-3 py-3 text-center">
                    {item.umur_bulan ?? "-"}
                  </td>

                  {/* 31. BALITA >5 TAHUN */}

                  <td className="border border-gray-400 px-3 py-3 text-center">
                    -
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
