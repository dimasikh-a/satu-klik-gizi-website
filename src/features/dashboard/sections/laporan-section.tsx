"use client";

import {
  useActionState,
  useEffect,
  useRef,
} from "react";

import {
  CalendarDays,
  FileText,
  Info,
  Search,
} from "lucide-react";

import { toast } from "sonner";

import { generateLaporanPeriode } from "@/features/laporan/action/generate-laporan-periode";
import { generateLaporanAnak } from "@/features/laporan/action/generate-laporan-anak";

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

type Props = {
  onPreview: (data: any) => void;
};

export default function LaporanSection({
  onPreview,
}: Props) {
  const [
    statePeriode,
    formActionPeriode,
  ] = useActionState(
    generateLaporanPeriode,
    null
  );

  const [
    stateAnak,
    formActionAnak,
  ] = useActionState(
    generateLaporanAnak,
    null
  );

  // ========================================
  // CEGAH EFFECT DIEKSEKUSI BERULANG
  // ========================================

  const lastPeriodeState =
    useRef<string | null>(null);

  const lastAnakState =
    useRef<string | null>(null);

  // ========================================
  // LAPORAN PERIODE
  // ========================================

  useEffect(() => {
    if (!statePeriode) return;

    const stateKey = JSON.stringify({
      success: statePeriode.success,
      error: statePeriode.error,
      bulan: statePeriode.bulan,
      tahun: statePeriode.tahun,
      count: statePeriode.data?.length ?? 0,
    });

    if (
      lastPeriodeState.current ===
      stateKey
    ) {
      return;
    }

    lastPeriodeState.current =
      stateKey;

    if (statePeriode.success) {
      toast.success(
        statePeriode.success
      );

      if (
        statePeriode.data &&
        statePeriode.bulan &&
        statePeriode.tahun
      ) {
        onPreview({
          type: "periode",
          data: statePeriode.data,
          bulan: statePeriode.bulan,
          tahun: statePeriode.tahun,
        });
      }
    }

    if (statePeriode.error) {
      toast.error(
        statePeriode.error
      );
    }
  }, [statePeriode, onPreview]);

  // ========================================
  // LAPORAN PER ANAK
  // ========================================

  useEffect(() => {
    if (!stateAnak) return;

    const stateKey = JSON.stringify({
      success: stateAnak.success,
      error: stateAnak.error,
      id: stateAnak.data?.idbalita,
    });

    if (
      lastAnakState.current ===
      stateKey
    ) {
      return;
    }

    lastAnakState.current =
      stateKey;

    if (stateAnak.success) {
      toast.success(
        stateAnak.success
      );

      if (stateAnak.data) {
        onPreview({
          type: "anak",
          data: stateAnak.data,
        });
      }
    }

    if (stateAnak.error) {
      toast.error(
        stateAnak.error
      );
    }
  }, [stateAnak, onPreview]);

  return (
    <section className="w-full">
      {/* ========================================
          HEADER
      ======================================== */}

      <div>
        <div className="flex items-center gap-3">
          <div
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-xl
              bg-teal-100
              text-teal-600
            "
          >
            <FileText size={24} />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Laporan
            </h1>

            <p className="mt-1 text-gray-500">
              Pilih periode dan data anak
              untuk membuat laporan.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-8 pt-6">
        {/* ========================================
            LAPORAN PERIODE
        ======================================== */}

        <form action={formActionPeriode}>
          <div
            className="
              rounded-2xl
              border
              border-gray-200
              bg-white
              p-6
            "
          >
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-800">
                Laporan Periode
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Pilih bulan dan tahun
                pemeriksaan.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {/* BULAN */}

              <div className="relative">
                <CalendarDays
                  size={20}
                  className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-gray-400
                  "
                />

                <select
                  name="bulan"
                  required
                  defaultValue=""
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
                    focus:border-teal-500
                    focus:ring-2
                    focus:ring-teal-100
                  "
                >
                  <option
                    value=""
                    disabled
                  >
                    Pilih Bulan
                  </option>

                  {months.map(
                    (month, index) => (
                      <option
                        key={month}
                        value={index + 1}
                      >
                        {month}
                      </option>
                    )
                  )}
                </select>
              </div>

              {/* TAHUN */}

              <div className="relative">
                <CalendarDays
                  size={20}
                  className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-gray-400
                  "
                />

                <select
                  name="tahun"
                  required
                  defaultValue=""
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
                    focus:border-teal-500
                    focus:ring-2
                    focus:ring-teal-100
                  "
                >
                  <option
                    value=""
                    disabled
                  >
                    Pilih Tahun
                  </option>

                  {Array.from(
                    {
                      length: 5,
                    },
                    (_, index) =>
                      new Date().getFullYear() -
                      index
                  ).map((year) => (
                    <option
                      key={year}
                      value={year}
                    >
                      {year}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <p className="mt-2 text-sm text-gray-500">
              Pilih bulan dan tahun
              pemeriksaan yang ingin
              ditampilkan pada laporan.
            </p>

            <div className="mt-5 flex justify-end">
              <button
                type="submit"
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
        </form>

        {/* ========================================
            LAPORAN PER ANAK
        ======================================== */}

        <form action={formActionAnak}>
          <div
            className="
              rounded-2xl
              border
              border-gray-200
              bg-white
              p-6
            "
          >
            <label className="mb-2 block font-semibold text-gray-700">
              Input NIK Anak{" "}
              <span className="text-red-500">
                *
              </span>
            </label>

            <div className="relative">
              <Search
                size={20}
                className="
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  text-gray-400
                "
              />

              <input
                type="text"
                name="nik"
                required
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
                  focus:border-teal-500
                  focus:ring-2
                  focus:ring-teal-100
                "
              />
            </div>

            <p className="mt-2 text-sm text-gray-500">
              Masukkan NIK anak untuk
              menampilkan seluruh riwayat
              pemeriksaan.
            </p>

            <div className="mt-6 flex justify-end">
              <button
                type="submit"
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
        </form>

        {/* ========================================
            INFO
        ======================================== */}

        <div
          className="
            flex
            items-center
            gap-4
            rounded-2xl
            border
            border-blue-200
            bg-blue-50
            p-5
          "
        >
          <div
            className="
              flex
              h-8
              w-8
              shrink-0
              items-center
              justify-center
              rounded-full
              bg-teal-600
            "
          >
            <Info
              size={18}
              className="text-white"
            />
          </div>

          <p className="text-teal-700">
            Pastikan data yang dimasukkan
            sudah benar sebelum melakukan
            generate laporan.
          </p>
        </div>
      </div>
    </section>
  );
}