"use client";

import { FileDown } from "lucide-react";

import ReportHeaderPeriode from "./report-header-periode";
import ReportTablePeriode from "./report-table-periode";
import { exportLaporanPeriode } from "./export-laporan-periode";

type ReportPreviewPeriodeProps = {
  data: any[];
  bulan: number;
  tahun: number;
};

export default function ReportPreviewPeriode({
  data,
  bulan,
  tahun,
}: ReportPreviewPeriodeProps) {
  function handleExport() {
    try {
      exportLaporanPeriode({
        data,
        bulan,
        tahun,
      });
    } catch (error) {
      console.error(
        "EXPORT LAPORAN PERIODE ERROR:",
        error
      );
    }
  }

  return (
    <div className="mt-10 w-full">
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

        {/* HEADER */}

        <ReportHeaderPeriode
          bulan={bulan}
          tahun={tahun}
        />

        {/* BUTTON */}

        <div className="mb-6 flex justify-end">
          <button
            type="button"
            onClick={handleExport}
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
              shadow-sm
              transition
              hover:bg-red-700
              active:scale-95
            "
          >
            <FileDown size={20} />

            Download PDF
          </button>
        </div>

        {/* TABLE */}

        <ReportTablePeriode
          data={data}
        />

      </div>
    </div>
  );
}