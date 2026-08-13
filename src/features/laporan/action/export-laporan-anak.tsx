"use client";

import { pdf } from "@react-pdf/renderer";

import LaporanAnakPDF from "../pdf/laporan-anak-pdf";

export async function exportLaporanAnak(
  balita: any
) {
  try {
    const blob = await pdf(
      <LaporanAnakPDF balita={balita} />
    ).toBlob();

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download = `Laporan-${balita.namaanak}.pdf`;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  } catch (error) {
    console.error(
      "EXPORT PDF ERROR",
      error
    );
  }
}