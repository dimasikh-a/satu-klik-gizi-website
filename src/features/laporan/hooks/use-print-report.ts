"use client";

import { useReactToPrint } from "react-to-print";

export function usePrintReport(
  contentRef: React.RefObject<HTMLDivElement>
) {
  return useReactToPrint({
    contentRef,

    documentTitle:
      "Formulir Pemantauan Pertumbuhan Balita",
  });
}