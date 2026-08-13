"use client";

import { FileDown } from "lucide-react";

import ReportPaper from "../component/report-paper";
import ReportHeaderPeriode from "./report-header-periode";
import ReportTablePeriode from "./report-table-periode";

type PemeriksaanPeriode = {
  idperiksa: number;
  idbalita: number;
  tglperiksa: string;

  bb: number;
  tb: number;

  cara_pengukuran: string | null;
  asi_eksklusif: string | null;

  statusbb: string | null;
  statustb: string | null;
  hasilgizi: string | null;

  umur_bulan: number;

  balita: {
    idbalita: number;
    id_orang_tua: number;
    nokk: string;
    nik_anak: string | null;
    namaanak: string;
    jeniskelamin: string;

    tanggallahir: string;

    bblahir: number | null;
    tblahir: number | null;

    anakke: number | null;
    imd: boolean | null;
    buku_kia: boolean | null;
    is_active: boolean;

    orang_tua: {
      id_orang_tua: number;
      nokk: string;

      nik_ayah: string | null;
      nama_ayah: string | null;

      nik_ibu: string | null;
      nama_ibu: string;

      no_telp_hp: string | null;

      alamat: string | null;
      rt: string | null;
      rw: string | null;
    };
  };
};

type ReportPeriodeProps = {
  data: PemeriksaanPeriode[];
  bulan: number;
  tahun: number;
};

export default function ReportPeriode({
  data,
  bulan,
  tahun,
}: ReportPeriodeProps) {
  return (
    <ReportPaper>
      {/* ========================================
          HEADER LAPORAN
      ======================================== */}

      <ReportHeaderPeriode
        bulan={bulan}
        tahun={tahun}
      />

      {/* ========================================
          ACTION
      ======================================== */}

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
            shadow-sm
            transition
            hover:bg-red-700
            hover:shadow-md
            active:scale-95
          "
        >
          <FileDown size={20} />

          Download PDF
        </button>
      </div>

      {/* ========================================
          INFO JUMLAH DATA
      ======================================== */}

      <div
        className="
          mb-4
          rounded-xl
          border
          border-teal-100
          bg-teal-50
          px-5
          py-3
          text-sm
          text-teal-700
        "
      >
        Menampilkan{" "}
        <span className="font-semibold">
          {data.length}
        </span>{" "}
        data pemeriksaan pada periode{" "}
        <span className="font-semibold">
          {bulan}/{tahun}
        </span>
        .
      </div>

      {/* ========================================
          TABLE
      ======================================== */}

      <ReportTablePeriode
        data={data}
      />
    </ReportPaper>
  );
}