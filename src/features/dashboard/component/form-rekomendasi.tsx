"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { PemeriksaanClient } from "@/features/pemeriksaan/types";


type RekomendasiFormProps = {
  mode: "create" | "edit";
  pemeriksaan: PemeriksaanClient;
  action: (formData: FormData) => void;
};

export default function RekomendasiForm({
  mode,
  pemeriksaan,
  action,
}: RekomendasiFormProps) {
  const router = useRouter();

  const isEdit = mode === "edit";

  const caraPengukuran = pemeriksaan.cara_pengukuran ?? "-";

  const asiEksklusif = pemeriksaan.asi_eksklusif ? "Ya" : "Tidak";

  const umur = `${pemeriksaan.umur_bulan} Bulan`;
  return (
    <form action={action}>
      <div className="px-6 pb-6">
        <div className="space-y-3">
          <div className="flex gap-3">
            {/* Nama Anak */}
            <div className="flex w-full flex-col gap-2">
              <label className="flex items-center gap-3 text-[17px] font-medium text-slate-800">
                <div className="h-3 w-3 rounded-full bg-cyan-500" />
                Nama Anak
              </label>

              <div className="relative">
                <input
                  type="text"
                  value={pemeriksaan.balita.namaanak}
                  readOnly
                  className="
          h-[50px]
          w-full
          rounded-[5px]
          border
          border-slate-300
          bg-slate-100
          pl-10
          pr-4
          text-[15px]
          text-slate-700
          cursor-not-allowed
          outline-none
        "
                />
              </div>
            </div>

            {/* Umur */}
            <div className="flex w-full flex-col gap-2">
              <label className="flex items-center gap-3 text-[17px] font-medium text-slate-800">
                <div className="h-3 w-3 rounded-full bg-cyan-500" />
                Umur
              </label>

              <div className="relative">
                <input
                  type="text"
                  value={`${pemeriksaan.umur_bulan} Bulan`}
                  readOnly
                  className="
          h-[50px]
          w-full
          rounded-[5px]
          border
          border-slate-300
          bg-slate-100
          pl-10
          pr-4
          text-[15px]
          text-slate-700
          cursor-not-allowed
          outline-none
        "
                />
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            {/* BB*/}
            <div className="flex flex-col gap-2 w-[70%]">
              <label className="col-span-3 flex items-center gap-3 text-[17px] font-medium text-slate-800">
                <div className="w-3 h-3 rounded-full bg-cyan-500" />
                BB
              </label>

              <div className="col-span-9 relative">
                <input
                  type="text"
                  value={`${pemeriksaan.bb} KG`}
                  readOnly
                  className="
          h-[50px]
          w-full
          rounded-[5px]
          border
          border-slate-300
          bg-slate-100
          pl-10
          pr-4
          text-[15px]
          text-slate-700
          cursor-not-allowed
          outline-none
        "
                />
              </div>
            </div>
            <div className="flex flex-col gap-2 w-full">
              <label className="col-span-3 flex items-center gap-3 text-[17px] font-medium text-slate-800">
                <div className="w-3 h-3 rounded-full bg-cyan-500" />
                Status BB
              </label>

              <div className="col-span-9 relative">
                <input
                  type="text"
                  value={pemeriksaan.statusbb ?? ""}
                  readOnly
                  className="
          h-[50px]
          w-full
          rounded-[5px]
          border
          border-slate-300
          bg-slate-100
          pl-10
          pr-4
          text-[15px]
          text-slate-700
          cursor-not-allowed
          outline-none
        "
                />
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            {/*TB*/}
            <div className="flex flex-col gap-2  w-[78%]">
              <label className="col-span-3 flex items-center gap-3 text-[17px] font-medium text-slate-800">
                <div className="w-3 h-3 rounded-full bg-cyan-500" />
                TB
              </label>

              <div className="col-span-9 relative">
                <input
                  type="text"
                  value={`${pemeriksaan.tb} CM`}
                  readOnly
                  className="
          h-[50px]
          w-full
          rounded-[5px]
          border
          border-slate-300
          bg-slate-100
          pl-10
          pr-4
          text-[15px]
          text-slate-700
          cursor-not-allowed
          outline-none
        "
                />
              </div>
            </div>
            <div className="flex flex-col gap-2 w-full">
              <label className="col-span-3 flex items-center gap-3 text-[17px] font-medium text-slate-800">
                <div className="w-3 h-3 rounded-full bg-cyan-500" />
                Status TB
              </label>

              <div className="col-span-9 relative">
                <input
                  type="text"
                   value={pemeriksaan.statusbb ?? ""}
                  readOnly
                  className="
          h-[50px]
          w-full
          rounded-[5px]
          border
          border-slate-300
          bg-slate-100
          pl-10
          pr-4
          text-[15px]
          text-slate-700
          cursor-not-allowed
          outline-none
        "
                />
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            {/*Hasil Gizi */}
            <div className="flex flex-col gap-2 w-full">
              <label className="col-span-3 flex items-center gap-3 text-[17px] font-medium text-slate-800">
                <div className="w-3 h-3 rounded-full bg-cyan-500" />
                Hasil Gizi
              </label>

              <div className="col-span-9 relative">
                <input
                  type="text"
                  value={`${pemeriksaan.hasilgizi}`}
                  readOnly
                  className="
          h-[50px]
          w-full
          rounded-[5px]
          border
          border-slate-300
          bg-slate-100
          pl-10
          pr-4
          text-[15px]
          text-slate-700
          cursor-not-allowed
          outline-none
        "
                />
              </div>
            </div>
            {/* Cara Pengukuran */}
            <div className="flex flex-col gap-2 w-full">
              <label className="col-span-3 flex items-center gap-3 text-[17px] font-medium text-slate-800">
                <div className="w-3 h-3 rounded-full bg-cyan-500" />
                Cara Pengukuran
              </label>

              <div className="col-span-9 relative">
                <input
                  name="tb"
                  type="text"
                  placeholder="Masukkan Tinggi Badan"
                  value={pemeriksaan.cara_pengukuran ?? ""}
             className="
          h-[50px]
          w-full
          rounded-[5px]
          border
          border-slate-300
          bg-slate-100
          pl-10
          pr-4
          text-[15px]
          text-slate-700
          cursor-not-allowed
          outline-none
        "
                />
              </div>
            </div>
          </div>

          <div className="flex w-full flex-col gap-2">
  <label className="flex items-center gap-3 text-[17px] font-medium text-slate-800">
    <div className="h-3 w-3 rounded-full bg-cyan-500" />
    Rekomendasi
  </label>

  <div className="relative">
    <textarea
      name="deskripsi"
      rows={6}
      placeholder="Masukkan rekomendasi berdasarkan hasil pemeriksaan..."
      className="
        w-full
        rounded-[5px]
        border
        border-slate-300
        bg-white
        px-4
        py-3
        text-[15px]
        text-slate-700
        outline-none
        resize-none
        transition
        focus:border-cyan-500
        focus:ring-1
        focus:ring-cyan-500
      "
    />
  </div>
</div>
        </div>
      </div>

      {/* FOOTER BUTTON */}
      <div
        className="
            border-t
            border-gray-200
            px-12
            py-3
            flex
            gap-8
            items-center
            justify-center
          "
      >
        {/* RIGHT */}
        <button
          onClick={() => router.push("/admin/dashboard/data-rekomendasi")}
          className="
                h-[45px]
                px-5
                rounded-[6px]
                border-2
                border-cyan-500
                text-cyan-500
                text-[15px]
                font-semibold
                flex
                items-center
                gap-2
                hover:bg-cyan-50
                transition
              "
        >
          Batal
        </button>

        <button
          className="
                h-[45px]
                px-5
                rounded-[5px]
                bg-gradient-to-r
                from-cyan-500
                to-teal-500
                text-white
                text-[15px]
                font-semibold
                flex
                items-center
                gap-2
                shadow-lg
                hover:scale-[1.02]
                transition
              "
        >
          {mode === "create" ? "Simpan Data" : "Update Data"}
        </button>
      </div>
    </form>
  );
}
