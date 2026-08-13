"use client";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// ========================================
// NAMA BULAN
// ========================================

const namaBulan = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

// ========================================
// FORMAT TANGGAL
// ========================================

function formatDate(
  value: string | Date | null | undefined
): string {
  if (!value) {
    return "-";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "-";
  }

  return date.toLocaleDateString("id-ID");
}

// ========================================
// VALUE ATAU "-"
// ========================================

function valueOrDash(
  value: unknown
): string {
  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {
    return "-";
  }

  return String(value);
}

// ========================================
// FORMAT ANGKA
// ========================================

function formatNumber(
  value: unknown
): string {
  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {
    return "-";
  }

  const number = Number(value);

  if (Number.isNaN(number)) {
    return "-";
  }

  return String(number);
}

// ========================================
// ASI EKSKLUSIF
// ========================================
//
// Contoh data:
//
// "1"
// "1,2"
// "1,2,3"
// "1, 3, 5"
// "1;3;5"
// "1|3|5"
//
// Jika bulan tersebut ada:
// ✓
//
// Jika tidak:
// -
// ========================================

function getAsiValue(
  value:
    | string
    | null
    | undefined,
  month: number
): string {
  if (!value) {
    return "-";
  }

  const normalized = String(value)
    .trim()
    .toLowerCase();

  if (!normalized) {
    return "-";
  }

  const selectedMonths =
    normalized
      .split(/[,\s;|]+/)
      .map((item) =>
        item.trim()
      )
      .filter(Boolean);

  return selectedMonths.includes(
    String(month)
  )
    ? "✓"
    : "-";
}

// ========================================
// EXPORT LAPORAN PERIODE
// ========================================

export function exportLaporanPeriode({
  data,
  bulan,
  tahun,
}: {
  data: any[];
  bulan: number;
  tahun: number;
}) {
  // ======================================
  // VALIDASI
  // ======================================

  if (!Array.isArray(data)) {
    console.error(
      "Data laporan periode bukan array:",
      data
    );

    return;
  }

  if (
    bulan < 1 ||
    bulan > 12
  ) {
    console.error(
      "Bulan laporan tidak valid:",
      bulan
    );

    return;
  }

  if (!tahun) {
    console.error(
      "Tahun laporan tidak valid:",
      tahun
    );

    return;
  }

  // ======================================
  // CREATE PDF
  // ======================================

  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const namaBulanLaporan =
    namaBulan[bulan - 1] ?? "-";

  // ======================================
  // JUDUL
  // ======================================

  doc.setFont(
    "helvetica",
    "bold"
  );

  doc.setFontSize(12);

  doc.text(
    "LAPORAN PEMANTAUAN PERTUMBUHAN BALITA",
    105,
    12,
    {
      align: "center",
    }
  );

  doc.setFontSize(10);

  doc.text(
    `Periode ${namaBulanLaporan} ${tahun}`,
    105,
    18,
    {
      align: "center",
    }
  );

  // ======================================
  // HEADER WILAYAH
  // ======================================

  doc.setFont(
    "helvetica",
    "normal"
  );

  doc.setFontSize(7);

  // KIRI

  doc.text(
    "Provinsi : Banten",
    12,
    27
  );

  doc.text(
    "Kabupaten/Kota : Tangerang Selatan",
    12,
    32
  );

  doc.text(
    "Puskesmas/Kecamatan : Pamulang",
    12,
    37
  );

  doc.text(
    "Desa/Kelurahan : Pamulang Timur",
    12,
    42
  );

  // KANAN

  doc.text(
    "Nama Posyandu : Gurame",
    110,
    27
  );

  doc.text(
    `Bulan : ${namaBulanLaporan}`,
    110,
    32
  );

  doc.text(
    `Tahun : ${tahun}`,
    110,
    37
  );

  // ======================================
  // DATA TABLE
  // ======================================

  const rows = data.map(
    (item: any, index: number) => {
      const balita =
        item?.balita;

      const orangTua =
        balita?.orang_tua;

      return [
        // -------------------------------
        // NO
        // -------------------------------

        index + 1,

        // -------------------------------
        // ANAK KE
        // -------------------------------

        valueOrDash(
          balita?.anakke
        ),

        // -------------------------------
        // TANGGAL LAHIR
        // -------------------------------

        formatDate(
          balita?.tanggallahir
        ),

        // -------------------------------
        // JENIS KELAMIN
        // -------------------------------

        valueOrDash(
          balita?.jeniskelamin
        ),

        // -------------------------------
        // NO KK
        // -------------------------------

        valueOrDash(
          orangTua?.nokk ??
            balita?.nokk
        ),

        // -------------------------------
        // NIK ANAK
        // -------------------------------

        valueOrDash(
          balita?.nik_anak
        ),

        // -------------------------------
        // NAMA ANAK
        // -------------------------------

        valueOrDash(
          balita?.namaanak
        ),

        // -------------------------------
        // BB LAHIR
        // -------------------------------

        formatNumber(
          balita?.bblahir
        ),

        // -------------------------------
        // TB/PB LAHIR
        // -------------------------------

        formatNumber(
          balita?.tblahir
        ),

        // -------------------------------
        // BUKU KIA
        // -------------------------------

        valueOrDash(
          balita?.buku_kia
        ),

        // -------------------------------
        // IMD
        // -------------------------------

        valueOrDash(
          balita?.imd
        ),

        // -------------------------------
        // NAMA AYAH
        // -------------------------------

        valueOrDash(
          orangTua?.nama_ayah
        ),

        // -------------------------------
        // NIK AYAH
        // -------------------------------

        valueOrDash(
          orangTua?.nik_ayah
        ),

        // -------------------------------
        // NO HP
        // -------------------------------

        valueOrDash(
          orangTua?.no_telp_hp
        ),

        // -------------------------------
        // ALAMAT
        // -------------------------------

        valueOrDash(
          orangTua?.alamat
        ),

        // -------------------------------
        // RT
        // -------------------------------

        valueOrDash(
          orangTua?.rt
        ),

        // -------------------------------
        // RW
        // -------------------------------

        valueOrDash(
          orangTua?.rw
        ),

        // -------------------------------
        // TANGGAL PENGUKURAN
        // -------------------------------

        formatDate(
          item?.tglperiksa
        ),

        // -------------------------------
        // BB
        // -------------------------------

        formatNumber(
          item?.bb
        ),

        // -------------------------------
        // TB
        // -------------------------------

        formatNumber(
          item?.tb
        ),

        // -------------------------------
        // CARA PENGUKURAN
        // -------------------------------

        valueOrDash(
          item?.cara_pengukuran
        ),

        // ===============================
        // ASI EKSKLUSIF BULAN 1
        // ===============================

        getAsiValue(
          item?.asi_eksklusif,
          1
        ),

        // ===============================
        // ASI EKSKLUSIF BULAN 2
        // ===============================

        getAsiValue(
          item?.asi_eksklusif,
          2
        ),

        // ===============================
        // ASI EKSKLUSIF BULAN 3
        // ===============================

        getAsiValue(
          item?.asi_eksklusif,
          3
        ),

        // ===============================
        // ASI EKSKLUSIF BULAN 4
        // ===============================

        getAsiValue(
          item?.asi_eksklusif,
          4
        ),

        // ===============================
        // ASI EKSKLUSIF BULAN 5
        // ===============================

        getAsiValue(
          item?.asi_eksklusif,
          5
        ),

        // ===============================
        // ASI EKSKLUSIF BULAN 6
        // ===============================

        getAsiValue(
          item?.asi_eksklusif,
          6
        ),

        // ===============================
        // VITAMIN A
        // ===============================

        "-",

        "-",

        // ===============================
        // UMUR
        // ===============================

        valueOrDash(
          item?.umur_bulan
        ),

        // ===============================
        // BALITA > 5 TAHUN
        // ===============================

        "-",
      ];
    }
  );

  // ======================================
  // TABLE HEADER
  // ======================================

  autoTable(doc, {
    startY: 48,

    head: [
      [
        "No",
        "Anak Ke",
        "Tgl Lahir",
        "JK",
        "No KK",
        "NIK Anak",
        "Nama Anak",
        "BB Lahir",
        "PB Lahir",
        "KIA",
        "IMD",
        "Nama Ayah",
        "NIK Ayah",
        "No HP",
        "Alamat",
        "RT",
        "RW",
        "Tgl Pengukuran",
        "BB",
        "TB",
        "Cara Ukur",
        "ASI 1",
        "ASI 2",
        "ASI 3",
        "ASI 4",
        "ASI 5",
        "ASI 6",
        "Vit A",
        "Vit A",
        "Umur",
        "Balita >5",
      ],
    ],

    body: rows,

    theme: "grid",

    // ====================================
    // STYLE TABLE
    // ====================================

    styles: {
      font: "helvetica",
      fontSize: 4,

      cellPadding: 1,

      valign: "middle",

      halign: "center",

      overflow: "linebreak",

      lineWidth: 0.1,
    },

    // ====================================
    // STYLE HEADER
    // ====================================

    headStyles: {
      fontStyle: "bold",

      fontSize: 4,

      halign: "center",

      valign: "middle",

      cellPadding: 1,

      lineWidth: 0.1,
    },

    // ====================================
    // COLUMN STYLE
    // ====================================

    columnStyles: {
      // Nama anak
      6: {
        halign: "left",
      },

      // Alamat
      14: {
        halign: "left",
      },

      // ASI
      21: {
        halign: "center",
      },

      22: {
        halign: "center",
      },

      23: {
        halign: "center",
      },

      24: {
        halign: "center",
      },

      25: {
        halign: "center",
      },

      26: {
        halign: "center",
      },
    },

    // ====================================
    // MARGIN
    // ====================================

    margin: {
      top: 48,
      right: 7,
      bottom: 14,
      left: 7,
    },

    // ====================================
    // ULANG HEADER SETIAP PAGE
    // ====================================

    showHead: "everyPage",

    // ====================================
    // PAGE BREAK
    // ====================================

    pageBreak: "auto",
  });

  // ======================================
  // FOOTER SETIAP HALAMAN
  // ======================================

  const totalPages =
    doc.getNumberOfPages();

  for (
    let page = 1;
    page <= totalPages;
    page++
  ) {
    doc.setPage(page);

    doc.setFont(
      "helvetica",
      "normal"
    );

    doc.setFontSize(6);

    // Kiri

    doc.text(
      `Laporan Periode ${namaBulanLaporan} ${tahun}`,
      7,
      290
    );

    // Kanan

    doc.text(
      `Halaman ${page} dari ${totalPages}`,
      203,
      290,
      {
        align: "right",
      }
    );
  }

  // ======================================
  // DOWNLOAD
  // ======================================

  const fileName =
    `Laporan-Periode-${namaBulanLaporan}-${tahun}.pdf`;

  doc.save(fileName);
}