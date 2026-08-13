"use client";

import {
  useCallback,
  useState,
} from "react";

import LaporanSection from "@/features/dashboard/sections/laporan-section";

// ========================================
// PREVIEW LAPORAN PERIODE
// JANGAN DIUBAH
// ========================================

import ReportPreviewPeriode from "./periode/report-preview-periode";

// ========================================
// PREVIEW LAPORAN ANAK
// ========================================

import ReportPreviewAnak from "./anak/report-preview-anak"
// ========================================
// TYPE LAPORAN PERIODE
// ========================================

type PeriodeReport = {
  type: "periode";

  data: any[];

  bulan: number;

  tahun: number;
};

// ========================================
// TYPE LAPORAN ANAK
// ========================================

type AnakReport = {
  type: "anak";

  data: any;
};

// ========================================
// TYPE REPORT
// ========================================

type ReportState =
  | PeriodeReport
  | AnakReport
  | null;

// ========================================
// COMPONENT
// ========================================

export default function Laporan() {
  const [report, setReport] =
    useState<ReportState>(null);

  // ======================================
  // HANDLE PREVIEW
  // ======================================

  const handlePreview = useCallback(
    (result: ReportState) => {
      console.log(
        "========== REPORT =========="
      );

      console.log(
        "RESULT:",
        result
      );

      console.log(
        "TYPE:",
        result?.type
      );

      setReport(result);
    },
    []
  );

  return (
    <div className="w-full">
      {/* ==================================
          INPUT LAPORAN
      ================================== */}

      <LaporanSection
        onPreview={handlePreview}
      />

      {/* ==================================
          PREVIEW LAPORAN
      ================================== */}

      {report?.type === "periode" && (
        <div className="mt-10 w-full">
          <ReportPreviewPeriode
            data={report.data}
            bulan={report.bulan}
            tahun={report.tahun}
          />
        </div>
      )}

      {/* ==================================
          PREVIEW LAPORAN ANAK
      ================================== */}

      {report?.type === "anak" && (
        <div className="mt-10 w-full">
          <ReportPreviewAnak
            data={report.data}
          />
        </div>
      )}
    </div>
  );
}