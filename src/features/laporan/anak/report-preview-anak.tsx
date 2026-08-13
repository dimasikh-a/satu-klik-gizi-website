"use client";

import { FileDown } from "lucide-react";

import ReportHeaderAnak from "./report-header-anak";
import ReportTable from "./report-table-anak"

import { exportLaporanAnak } from "./export-laporan-anak";

type ReportPreviewAnakProps = {
  data: any;
};

export default function ReportPreviewAnak({
  data,
}: ReportPreviewAnakProps) {
  if (!data) {
    return null;
  }

  return (
    <div className="w-full">
      {/* ========================================
          HEADER
      ======================================== */}

      <ReportHeaderAnak
        data={data}
      />

      {/* ========================================
          DOWNLOAD PDF
      ======================================== */}

      <div className="mt-6 flex justify-end">
        <button
          type="button"
          onClick={() =>
            exportLaporanAnak(data)
          }
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
            shadow-md
            transition
            hover:bg-red-700
            hover:shadow-lg
            active:scale-95
          "
        >
          <FileDown size={20} />

          Download PDF
        </button>
      </div>

      {/* ========================================
          TABLE
      ======================================== */}

      <div className="mt-6">
        <ReportTable
          balita={data}
        />
      </div>
    </div>
  );
}