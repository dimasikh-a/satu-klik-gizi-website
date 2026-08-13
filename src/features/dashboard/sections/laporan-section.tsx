"use client";

import { FileText, CalendarDays, Search, Info } from "lucide-react";

const months = [
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

export default function ReportForm() {
  return (
    <div className="mt-20 font-mono w-full min-w-0">

      {/* Header */}
      <div className="flex items-center gap-5 w-full">
        <div>
          <h1 className="text-3xl font-bold text-teal-600">
            Laporan
          </h1>

          <p className="mt-1 text-gray-500">
            Pilih periode dan data anak untuk membuat laporan.
          </p>
        </div>
      </div>

      <div className=" space-y-4 pt-5 w-full">

        {/* Periode */}
        <div>

          <label className="mb-2 block font-semibold text-gray-700">
            Pilih Periode <span className="text-red-500">*</span>
          </label>

          <div className="flex items-center gap-4">

            <div className="relative w-full">

              <CalendarDays
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <select
                className="
                  h-14
                  w-full
                  appearance-none
                  rounded-xl
                  border
                  border-gray-300
                  bg-white
                  pl-12
                  pr-10
                  text-gray-700
                  outline-none
                  transition
                  focus:border-blue-500
                  focus:ring-2
                  focus:ring-blue-100
                "
              >
                <option value="">
                  Januari - Desember
                </option>

                {months.map((month) => (
                  <option key={month}>{month}</option>
                ))}
              </select>

              <svg
                className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>

            </div>

            <span className="font-medium text-gray-700">
              / Bulan
            </span>

          </div>

          <p className="mt-2 text-sm text-gray-500">
            Pilih periode bulan yang ingin ditampilkan pada laporan.
          </p>

        </div>

        {/* NIK */}

        <div>

          <label className="mb-2 block font-semibold text-gray-700">
            Input NIK Anak <span className="text-red-500">*</span>
          </label>

          <div className="relative">

            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Masukkan NIK Anak"
              className="
                h-14
                w-full
                rounded-xl
                border
                border-gray-300
                pl-12
                pr-4
                text-gray-700
                placeholder:text-gray-400
                outline-none
                transition
                focus:border-blue-500
                focus:ring-2
                focus:ring-blue-100
              "
            />

          </div>

          <p className="mt-2 text-sm text-gray-500">
            Masukkan NIK anak untuk menampilkan data sesuai anak.
          </p>

        </div>

        {/* Info */}

        <div className="flex items-center gap-4 rounded-2xl border border-blue-200 bg-blue-50 p-5">

          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-teal-600">
            <Info size={18} className="text-white" />
          </div>

          <p className="text-teal-600">
            Pastikan data yang Anda masukkan sudah benar sebelum
            melakukan generate laporan.
          </p>

        </div>

        {/* Button */}

        <div className="flex justify-end">

          <button
            className="
              flex
              items-center
              gap-2
              rounded-xl
              bg-teal-600
              px-8
              py-3
              font-medium
              text-white
              shadow-md
              transition-all
              duration-200
              hover:bg-teal-700
              hover:shadow-lg
              active:scale-95
            "
          >
            <FileText size={20} />

           Buat Laporan
          </button>

        </div>

      </div>

    </div>
  );
}