"use client";

import { useState } from "react";

import LaporanSection from "@/features/dashboard/sections/laporan-section";
import ReportPreview from "./report-preview";

type ReportState =
  | {
      type: "anak";
      data: any;
    }
  | {
      type: "periode";
      data: any[];
      bulan: number;
      tahun: number;
    }
  | null;

export default function Laporan() {
  const [report, setReport] =
    useState<ReportState>(null);

  return (
    <div className="w-full">
      {/* ========================================
          FORM LAPORAN
      ======================================== */}

      <LaporanSection
        onPreview={(data) => {
          console.log(
            "========== REPORT PREVIEW =========="
          );

          console.log("DATA:", data);

          console.log(
            "TYPE:",
            data?.type
          );

          setReport(data);
        }}
      />

      {/* ========================================
          PREVIEW
      ======================================== */}

      {report && (
        <div className="mt-10 w-full">
          <ReportPreview
            report={report}
          />
        </div>
      )}
    </div>
  );
}