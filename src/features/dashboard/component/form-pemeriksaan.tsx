"use client";

import {
  CalendarDays,
  X,
  Hash,
  Weight,
  Ruler,
} from "lucide-react";
import { Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { hitungUmurBulan } from "@/lib/calculate-age";
import { useMemo } from "react";
import type {
  BalitaOption,
  PemeriksaanClient,
} from "@/features/pemeriksaan/types";

type PemeriksaanFormProps = {
  mode: "create" | "edit";

  balita: BalitaOption[];

  periksa?: PemeriksaanClient;

  action: (formData: FormData) => void;
};



export default function PemeriksaanForm({
  mode,
  balita,
  periksa,
  action,
}: PemeriksaanFormProps) {
  const router = useRouter();

  // ==========================
  // NIK Anak Autocomplete
  // ==========================
  const [searchNik, setSearchNik] = useState(periksa?.balita.nik_anak ?? "");

  const [selectedBalita, setSelectedBalita] = useState<BalitaOption | null>(
    null,
  );

  const [showSuggestions, setShowSuggestions] = useState(false);

  const filteredBalita = useMemo(() => {
    const keyword = searchNik.trim();

    if (!keyword) {
      return [];
    }

    return balita
      .filter(
        (item) =>
          item.nik_anak?.includes(keyword) ||
          item.namaanak.toLowerCase().includes(keyword.toLowerCase()),
      )
      .slice(0, 5);
  }, [searchNik, balita]);

  const handleSearchChange = (value: string) => {
    setSearchNik(value);
    setSelectedBalita(null);
    setShowSuggestions(true);
  };

  const handleSelectBalita = (item: BalitaOption) => {
    setSearchNik(item.nik_anak ?? "");
    setSelectedBalita(item);
    setShowSuggestions(false);
  };

  // ==========================
  // ASI Eksklusif
  // ==========================
  const [asiEksklusif, setAsiEksklusif] = useState<boolean | null>(
    periksa?.asi_eksklusif ?? null,
  );

  const [bulanAsi, setBulanAsi] = useState<number[]>([]);

  const bulan = [0, 1, 2, 3, 4, 5];

  return (
    <form action={action}>
      <div className="px-6 pb-5">
        <div className="space-y-3">
          <div className="flex gap-3">
            {/* Tanggal Periksa */}
            <div className="flex flex-col gap-2 w-full">
              <label className="col-span-3 flex items-center gap-3 text-[17px] font-medium text-slate-800">
                <div className="w-3 h-3 rounded-full bg-cyan-500" />
                Tanggal Periksa
              </label>

              <div className="col-span-9 relative">
                <CalendarDays
                  size={21}
                  className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  name="tglperiksa"
                  type="date"
                  defaultValue={
                    periksa?.tglperiksa
                      ? new Date(periksa.tglperiksa).toISOString().split("T")[0]
                      : ""
                  }
                  placeholder="Masukan Tanggal Periksa"
                  className="
                    w-full
                    h-[50px]
                    rounded-[5px]
                    border
                    text-black
                    border-gray-300
                    bg-white
                    pl-10
                    pr-6
                    text-[15px]
                    outline-none
                    focus:border-cyan-500
                    transition
                  "
                />
              </div>
            </div>

            {/* NIK Anak */}
            <div className="flex flex-col gap-2 w-full">
              <label className="col-span-3 flex items-center gap-3 text-[18px] font-medium text-slate-800">
                <div className="w-3 h-3 rounded-full bg-cyan-500" />
                NIK Anak
              </label>

              <div className="col-span-9 relative">
                <Hash
                  size={21}
                  className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  value={searchNik}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  onFocus={() => setShowSuggestions(true)}
                  placeholder="Masukan Nik Anak"
                  className="
                    w-full
                    h-[50px]
                    rounded-[5px]
                    border
                    text-black
                    border-gray-300
                    bg-white
                    pl-10
                    pr-6
                    text-[16px]
                    outline-none
                    focus:border-cyan-500
                    transition
                  "
                />
                {showSuggestions &&
  filteredBalita.length > 0 && (
    <div className="absolute z-50 mt-1 w-full rounded-md border bg-white shadow-lg">

      {filteredBalita.map((item) => (
        <button
          key={item.idbalita}
          type="button"
          onClick={() =>
            handleSelectBalita(item)
          }
          className="
            w-full
            px-4
            py-3
            text-left
            text-black
            hover:bg-cyan-50
          "
        >
          {item.nik_anak} - {item.namaanak}
        </button>
      ))}

    </div>
)}
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            {/* Jenis Kelamin */}
            <div className="flex flex-col gap-2 w-full">
              <label className="col-span-3 flex items-center gap-3 text-[17px] font-medium text-slate-800">
                <div className="w-3 h-3 rounded-full bg-cyan-500" />
                Jenis Kelamin
              </label>

              <div className="col-span-9 relative">
                <input
                  name="jeniskelamin"
                  value={selectedBalita?.jeniskelamin ?? ""}
                  readOnly
                  className="
                    w-full
                    h-[50px]
                    rounded-[5px]
                    border
                    text-black
                    border-gray-300
                    bg-white
                    pl-10
                    pr-6
                    text-[16px]
                    outline-none
                    focus:border-cyan-500
                    transition
                  "
                />
              </div>
            </div>

            {/* Nama Ayah */}
            <div className="flex flex-col gap-2 w-full">
              <label className="col-span-3 flex items-center gap-3 text-[18px] font-medium text-slate-800">
                <div className="w-3 h-3 rounded-full bg-cyan-500" />
                Nama Ayah
              </label>

              <div className="col-span-9 relative">
                <input
                  name="namaayah"
                  value={selectedBalita?.orang_tua.nama_ayah ?? ""}
                  readOnly
                  className="
                    w-full
                    h-[50px]
                    rounded-[5px]
                    border
                    text-black
                    border-gray-300
                    bg-white
                    pl-10
                    pr-6
                    text-[16px]
                    outline-none
                    focus:border-cyan-500
                    transition
                  "
                />
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            {/* BB Lahir */}
            <div className="flex flex-col gap-2 w-full">
              <label className="col-span-3 flex items-center gap-3 text-[17px] font-medium text-slate-800">
                <div className="w-3 h-3 rounded-full bg-cyan-500" />
                BB Lahir
              </label>

              <div className="col-span-9 relative">
                <input
                  name="jeniskelamin"
                  value={selectedBalita?.bblahir ?? ""}
                  readOnly
                  className="
                    w-full
                    h-[50px]
                    rounded-[5px]
                    border
                    text-black
                    border-gray-300
                    bg-white
                    pl-10
                    pr-6
                    text-[16px]
                    outline-none
                    focus:border-cyan-500
                    transition
                  "
                />
              </div>
            </div>

            {/* TB Lahir */}
            <div className="flex flex-col gap-2 w-full">
              <label className="col-span-3 flex items-center gap-3 text-[18px] font-medium text-slate-800">
                <div className="w-3 h-3 rounded-full bg-cyan-500" />
                TB Lahir
              </label>

              <div className="col-span-9 relative">
                <input
                  value={selectedBalita?.tblahir ?? ""}
                  readOnly
                  className="
                    w-full
                    h-[50px]
                    rounded-[5px]
                    border
                    text-black
                    border-gray-300
                    bg-white
                    pl-10
                    pr-6
                    text-[16px]
                    outline-none
                    focus:border-cyan-500
                    transition
                  "
                />
              </div>
            </div>
            {/* Umur */}
            <div className="flex flex-col gap-2 w-full">
              <label className="col-span-3 flex items-center gap-3 text-[18px] font-medium text-slate-800">
                <div className="w-3 h-3 rounded-full bg-cyan-500" />
                Umur
              </label>

              <div className="col-span-9 relative">
                <input
                  value={
                    selectedBalita
                      ? `${hitungUmurBulan(
                          selectedBalita.tanggallahir,
                          new Date(),
                        )} Bulan`
                      : ""
                  }
                  readOnly
                  className="
                    w-full
                    h-[50px]
                    rounded-[5px]
                    border
                    text-black
                    border-gray-300
                    bg-white
                    pl-10
                    pr-6
                    text-[16px]
                    outline-none
                    focus:border-cyan-500
                    transition
                  "
                />
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            {/*BERAT BADAN */}
            <div className="flex flex-col gap-2 w-full">
              <label className="col-span-3 flex items-center gap-3 text-[17px] font-medium text-slate-800">
                <div className="w-3 h-3 rounded-full bg-cyan-500" />
                BB
              </label>

              <div className="col-span-9 relative">
                <Weight
                  size={21}
                  className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  name="bb"
                  type="number"
                  step="0.01"
                  placeholder="Masukkan Berat Badan"
                  defaultValue={periksa?.bb?.toString() ?? ""}
                  className="
                              w-full
                              h-[50px]
                              rounded-[5px]
                              border
                              text-black
                              border-gray-300
                              bg-white
                              pl-10
                              pr-6
                              text-[15px]
                              outline-none
                              focus:border-cyan-500
                              transition
                            "
                />
              </div>
            </div>
            {/* TINGGI BADAN */}
            <div className="flex flex-col gap-2 w-full">
              <label className="col-span-3 flex items-center gap-3 text-[17px] font-medium text-slate-800">
                <div className="w-3 h-3 rounded-full bg-cyan-500" />
                TB
              </label>

              <div className="col-span-9 relative">
                <Ruler
                  size={21}
                  className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  name="tb"
                  type="number"
                  step="0.01"
                  placeholder="Masukkan Tinggi Badan"
                  defaultValue={periksa?.tb?.toString() ?? ""}
                  className="
                              w-full
                              h-[50px]
                              rounded-[5px]
                              border
                              text-black
                              border-gray-300
                              bg-white
                              pl-10
                              pr-6
                              text-[15px]
                              outline-none
                              focus:border-cyan-500
                              transition
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
                            <Ruler
                              size={21}
                              className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-400"
                            />
            
                            <select
                              name="cara_pengukuran"
                              defaultValue={periksa?.cara_pengukuran ?? ""}
                              className="
                                w-full
                                h-[50px]
                                rounded-[5px]
                                border
                                text-black
                                border-gray-300
                                bg-white
                                pl-10
                                pr-6
                                text-[15px]
                                outline-none
                                focus:border-cyan-500
                                transition
                              "
                            >
                              <option>Terlentang</option>
                              <option>Berdiri</option>
                            </select>
                          </div>
                        </div>
          </div>

          <div className="flex gap-3">
            <label className="col-span-3 flex items-center gap-3 text-[17px] font-medium text-slate-800">
              <div className="w-3 h-3 rounded-full bg-cyan-500" />
              Asi Eksklusif
            </label>
            {/* asi ekslusif */}
            <select
              name="asi_eksklusif"
              className=" text-black
              border
              text-[15px]
                    border-gray-300
                    bg-white"
              onChange={(e) => {
                const value = e.target.value === "true";

                setAsiEksklusif(value);

                if (!value) {
                  setBulanAsi([]);
                }
              }}
            >
              <option value="">Pilih</option>
              <option value="true">Ya</option>
              <option value="false">Tidak</option>
            </select>
          </div>

          <div className="flex gap-4 flex-wrap">
            {bulan.map((item) => (
              <label key={item} className="flex items-center text-black gap-2">
                <input
                  type="checkbox"
                  disabled={!asiEksklusif}
                  checked={bulanAsi.includes(item)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setBulanAsi((prev) => [...prev, item]);
                    } else {
                      setBulanAsi((prev) => prev.filter((b) => b !== item));
                    }
                  }}
                />
                {item} Bulan
              </label>
            ))}
          </div>
          <input
            type="hidden"
            name="idbalita"
            value={selectedBalita?.idbalita ?? ""}
          />
        </div>
      </div>

      {/* FOOTER BUTTON */}
      <div
        className="
            py-3
            flex
            gap-8
            items-center
            justify-center
          "
      >
        <button
          type="button"
          onClick={() => router.push("/admin/dashboard/data-pemeriksaan")}
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
          <X size={28} />
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
          <Save size={28} />
          {mode === "create" ? "Simpan Data" : "Update Data"}
        </button>
      </div>
    </form>
  );
}
