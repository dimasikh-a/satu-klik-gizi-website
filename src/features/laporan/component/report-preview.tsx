"use client";

import { FileDown } from "lucide-react";

import ReportPaper from "./report-paper";
import ReportHeaderAnak from "./report-header-anak";
import ReportHeaderPeriode from "./report-header-periode";
import ReportTable from "./report-table";

type ReportAnak = {
  type: "anak";
  data: any;
};

type ReportPeriode = {
  type: "periode";
  data: any[];
  bulan: number;
  tahun: number;
};

type ReportState = ReportAnak | ReportPeriode;

type ReportPreviewProps = {
  report?: ReportState | null;
};

export default function ReportPreview({
  report,
}: ReportPreviewProps) {
  /*
   * Jangan render apa pun kalau report belum ada.
   */
  if (!report) {
    return null;
  }

  /*
   * ================================
   * LAPORAN PER ANAK
   * ================================
   */
  if (report.type === "anak") {
    return (
      <ReportPaper>
        <ReportHeaderAnak data={report.data} />

        <div className="mb-6 flex justify-end">
          <button
            type="button"
            className="
              flex
              items-center
              gap-2
              rounded-xl
              bg-red-600
              px-6
              py-3
              font-medium
              text-white
              transition
              hover:bg-red-700
              active:scale-95
            "
          >
            <FileDown size={20} />
            Download PDF
          </button>
        </div>

        <ReportTable balita={report.data} />
      </ReportPaper>
    );
  }

  /*
   * ================================
   * LAPORAN PERIODE
   * ================================
   */

  return (
    <ReportPaper>
      <ReportHeaderPeriode
        bulan={report.bulan}
        tahun={report.tahun}
      />

      <div className="mb-6 flex justify-end">
        <button
          type="button"
          className="
            flex
            items-center
            gap-2
            rounded-xl
            bg-red-600
            px-6
            py-3
            font-medium
            text-white
            transition
            hover:bg-red-700
            active:scale-95
          "
        >
          <FileDown size={20} />
          Download PDF
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-3 py-2">
                No
              </th>

              <th className="border border-gray-300 px-3 py-2">
                No KK
              </th>

              <th className="border border-gray-300 px-3 py-2">
                Nama Ibu
              </th>

              <th className="border border-gray-300 px-3 py-2">
                NIK Anak
              </th>

              <th className="border border-gray-300 px-3 py-2">
                Nama Anak
              </th>

              <th className="border border-gray-300 px-3 py-2">
                Tanggal
              </th>

              <th className="border border-gray-300 px-3 py-2">
                Umur
              </th>

              <th className="border border-gray-300 px-3 py-2">
                TB
              </th>

              <th className="border border-gray-300 px-3 py-2">
                BB
              </th>

              <th className="border border-gray-300 px-3 py-2">
                TB/U
              </th>

              <th className="border border-gray-300 px-3 py-2">
                BB/U
              </th>

              <th className="border border-gray-300 px-3 py-2">
                Hasil
              </th>
            </tr>
          </thead>

          <tbody>
            {report.data.map(
              (item: any, index: number) => (
                <tr
                  key={`${item.idperiksa}-${index}`}
                >
                  <td className="border border-gray-300 px-3 py-2 text-center">
                    {index + 1}
                  </td>

                  <td className="border border-gray-300 px-3 py-2">
                    {item.balita?.orang_tua?.nokk ??
                      item.balita?.nokk ??
                      "-"}
                  </td>

                  <td className="border border-gray-300 px-3 py-2">
                    {item.balita?.orang_tua
                      ?.nama_ibu ?? "-"}
                  </td>

                  <td className="border border-gray-300 px-3 py-2">
                    {item.balita?.nik_anak ?? "-"}
                  </td>

                  <td className="border border-gray-300 px-3 py-2">
                    {item.balita?.namaanak ?? "-"}
                  </td>

                  <td className="border border-gray-300 px-3 py-2">
                    {item.tglperiksa
                      ? new Date(
                          item.tglperiksa
                        ).toLocaleDateString(
                          "id-ID"
                        )
                      : "-"}
                  </td>

                  <td className="border border-gray-300 px-3 py-2 text-center">
                    {item.umur_bulan ?? "-"}
                  </td>

                  <td className="border border-gray-300 px-3 py-2 text-center">
                    {item.tb ?? "-"}
                  </td>

                  <td className="border border-gray-300 px-3 py-2 text-center">
                    {item.bb ?? "-"}
                  </td>

                  <td className="border border-gray-300 px-3 py-2 text-center">
                    {item.statustb ?? "-"}
                  </td>

                  <td className="border border-gray-300 px-3 py-2 text-center">
                    {item.statusbb ?? "-"}
                  </td>

                  <td className="border border-gray-300 px-3 py-2 text-center">
                    {item.hasilgizi ?? "-"}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </ReportPaper>
  );
}