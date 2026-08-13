import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

type Pemeriksaan = {
  idperiksa: number;
  tglperiksa: string;
  bb: number;
  tb: number;
  statusbb: string | null;
  statustb: string | null;
  hasilgizi: string | null;
};

type Balita = {
  namaanak: string;
  nik_anak: string | null;
  bblahir: number | null;
  tblahir: number | null;

  orang_tua: {
    nokk: string;
    nama_ibu: string;
  };

  pemeriksaan: Pemeriksaan[];
};

export function exportLaporanAnak(
  balita: Balita
) {
  // ========================================
  // A4 PORTRAIT
  // ========================================

  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  // ========================================
  // MARGIN
  // ========================================

  const marginLeft = 15;

  // ========================================
  // JUDUL
  // ========================================

  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);

  doc.text(
    "FORMULIR PEMANTAUAN",
    105,
    20,
    {
      align: "center",
    }
  );

  doc.setFontSize(12);

  doc.text(
    "PERTUMBUHAN BALITA",
    105,
    27,
    {
      align: "center",
    }
  );

  // ========================================
  // IDENTITAS ANAK
  // ========================================

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");

  const identity = [
    [
      "Nama Anak",
      balita.namaanak || "-",
    ],
    [
      "NIK Anak",
      balita.nik_anak ?? "-",
    ],
    [
      "No KK",
      balita.orang_tua?.nokk ?? "-",
    ],
    [
      "Nama Ibu",
      balita.orang_tua?.nama_ibu ?? "-",
    ],
    [
      "Tahun",
      new Date().getFullYear().toString(),
    ],
  ];

  let y = 38;

  identity.forEach(
    ([label, value]) => {
      doc.setFont(
        "helvetica",
        "bold"
      );

      doc.text(
        label,
        marginLeft,
        y
      );

      doc.setFont(
        "helvetica",
        "normal"
      );

      doc.text(
        `: ${value}`,
        marginLeft + 35,
        y
      );

      y += 6;
    }
  );

  // ========================================
  // DATA PEMERIKSAAN
  // ========================================

  const rows =
    balita.pemeriksaan.map(
      (item, index) => [
        index + 1,

        balita.orang_tua?.nokk ??
          "-",

        balita.orang_tua?.nama_ibu ??
          "-",

        balita.nik_anak ?? "-",

        balita.namaanak || "-",

        balita.bblahir ?? "-",

        balita.tblahir ?? "-",

        item.tglperiksa
          ? new Date(
              item.tglperiksa
            ).toLocaleDateString(
              "id-ID"
            )
          : "-",

        item.tb ?? "-",

        item.bb ?? "-",

        item.statustb ?? "-",

        item.statusbb ?? "-",

        item.hasilgizi ?? "-",
      ]
    );

  // ========================================
  // TABLE
  // ========================================

  autoTable(doc, {
    startY: y + 5,

    head: [
      [
        "No",
        "No KK",
        "Nama Ibu",
        "NIK Anak",
        "Nama Anak",
        "BB Lahir",
        "TB Lahir",
        "Tgl Pemeriksaan",
        "TB",
        "BB",
        "TB/U",
        "BB/U",
        "Hasil Gizi",
      ],
    ],

    body: rows,

    theme: "grid",

    styles: {
      font: "helvetica",
      fontSize: 6,
      cellPadding: 1.5,
      lineColor: [0, 0, 0],
      lineWidth: 0.2,
      textColor: [0, 0, 0],
      valign: "middle",
    },

    headStyles: {
      fontStyle: "bold",
      halign: "center",
      valign: "middle",
      fillColor: [240, 240, 240],
      textColor: [0, 0, 0],
    },

    bodyStyles: {
      halign: "center",
    },

    columnStyles: {
      0: {
        cellWidth: 7,
      },

      1: {
        cellWidth: 18,
      },

      2: {
        cellWidth: 20,
      },

      3: {
        cellWidth: 22,
      },

      4: {
        cellWidth: 22,
      },

      5: {
        cellWidth: 13,
      },

      6: {
        cellWidth: 13,
      },

      7: {
        cellWidth: 18,
      },

      8: {
        cellWidth: 10,
      },

      9: {
        cellWidth: 10,
      },

      10: {
        cellWidth: 12,
      },

      11: {
        cellWidth: 12,
      },

      12: {
        cellWidth: 18,
      },
    },

    margin: {
      left: 10,
      right: 10,
    },
  });

  // ========================================
  // NAMA FILE
  // ========================================

  const safeName =
    balita.namaanak
      ?.replace(
        /[^a-zA-Z0-9-_]/g,
        "-"
      )
      .toLowerCase() ||
    "laporan-anak";

  // ========================================
  // DOWNLOAD
  // ========================================

  doc.save(
    `laporan-anak-${safeName}.pdf`
  );
}