"use client";

import { useMemo, useState } from "react";
import {
  User,
  IdCard,
  VenusAndMars,
  CalendarDays,
  Weight,
  Ruler,
  Save,
  X,
  WeightIcon,
  Hash,
} from "lucide-react";
import { useRouter } from "next/navigation";
type Balita = {
  // Primary Key
  idbalita: number;

  // Relasi
  id_orang_tua: number;
  nokk: string;

  // Identitas Anak
  nik_anak: string | null;
  namaanak: string;
  jeniskelamin: string;
  tanggallahir: Date;

  // Data Kelahiran
  bblahir: number | null;
  tblahir: number | null;
  anakke: number | null;

  // Informasi Tambahan
  imd: boolean | null;
  buku_kia: boolean | null;

  // Status
  is_active: boolean;
};

type ParentOption = {
  nokk: string;
  nama_ibu: string;
};

type BalitaFormProps = {
  mode: "create" | "edit";
  balita?: Balita;
  parents: ParentOption[];
  action: (formData: FormData) => void;
};

export default function BalitaForm({
  mode,
  balita,
  action,
  parents,
}: BalitaFormProps) {
  const router = useRouter();

  const [searchNokk, setSearchNokk] = useState(balita?.nokk ?? "");

  const [selectedNokk, setSelectedNokk] = useState(balita?.nokk ?? "");

  const [showSuggestions, setShowSuggestions] = useState(false);

  const filteredParents = useMemo(() => {
    const keyword = searchNokk.trim();

    if (!keyword) {
      return [];
    }

    return parents
      .filter((parent) => parent.nokk.includes(keyword))
      .slice(0, 5);
  }, [searchNokk, parents]);

  const handleSearchChange = (value: string) => {
    setSearchNokk(value);
    setSelectedNokk("");
    setShowSuggestions(true);
  };

  const handleSelectParent = (nokk: string) => {
    setSearchNokk(nokk);
    setSelectedNokk(nokk);
    setShowSuggestions(false);
  };

  const selectedParent = useMemo(() => {
    return parents.find((parent) => parent.nokk === selectedNokk);
  }, [selectedNokk, parents]);
  return (
    <form action={action}>
      <div className="px-6 pb-6">
        <div className="space-y-3">
          <div className="flex gap-3">
            {/* KIA */}
            <div className="flex flex-col gap-2 w-full">
              <label className="col-span-3 flex items-center gap-3 text-[17px] font-medium text-slate-800">
                <div className="w-3 h-3 rounded-full bg-cyan-500" />
                NIK Anak
              </label>

              <div className="col-span-9 relative">
                <Hash
                  size={21}
                  className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  name="nikanak"
                  defaultValue={balita?.nik_anak ?? ""}
                  type="text"
                  placeholder="Masukan NIK Anak"
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
            {/* NO KK */}
            <div className="flex flex-col gap-2 w-full relative">
              <label className="col-span-3 flex items-center gap-3 text-[17px] font-medium text-slate-800">
                <div className="w-3 h-3 rounded-full bg-cyan-500" />
                No KK
              </label>

              <input
                type="text"
                value={searchNokk}
                placeholder="masukan No KK"
                onChange={(e) => handleSearchChange(e.target.value)}
                className="
      w-full
      rounded-[5px]
      border
      border-slate-300
      text-black
      px-4
      py-3
      outline-none
      focus:border-cyan-500
    "
              />

              {/* Hidden input untuk FormData */}
              <input type="hidden" name="nokk" value={selectedNokk} />

              {showSuggestions &&
    filteredParents.length > 0 && (
                <div
                  className="
    absolute
    top-full
    left-0
    z-50
    mt-1
    w-full

    max-h-60
    overflow-y-auto

    rounded-xl
    border
    border-slate-200
    bg-white
    shadow-lg
        "
                >
                  {filteredParents.map((parent) => (
                    <button
                    key={parent.nokk}
                      type="button"
                      onClick={() => handleSelectParent(parent.nokk)}
                      className="
                block
                w-full
                px-4
                py-3
                text-left
                text-black
                hover:bg-slate-100
              "
                    >
                      <div className="font-medium">{parent.nokk} - {parent.nama_ibu}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

<div className="flex gap-3">
          {/* NAMA ANAK*/}
          <div className="flex flex-col gap-2 w-full">
            <label className="col-span-3 flex items-center gap-3 text-[17px] font-medium text-slate-800">
              <div className="w-3 h-3 rounded-full bg-cyan-500" />
              Nama Anak
            </label>

            <div className="col-span-9 relative">
              <User
                size={21}
                className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                name="namaanak"
                type="text"
                defaultValue={balita?.namaanak ?? ""}
                placeholder="Masukan Nama Anak"
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
          {/* ANAK KE*/}
          <div className="flex flex-col gap-2 w-full">
            <label className="col-span-3 flex items-center gap-3 text-[17px] font-medium text-slate-800">
              <div className="w-3 h-3 rounded-full bg-cyan-500" />
              Anak Ke
            </label>

            <div className="col-span-9 relative">
              <User
                size={21}
                className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                name="anakke"
                type="text"
                defaultValue={balita?.anakke ?? ""}
                placeholder="Masukan Nama Anak"
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
          </div>
          {/* field 3 + 4 */}
          <div className="flex gap-3">
            {/* TANGGAL LAHIR */}
            <div className="flex flex-col gap-2 w-full">
              <label className="col-span-3 flex items-center gap-3 text-[17px] font-medium text-slate-800">
                <div className="w-3 h-3 rounded-full bg-cyan-500" />
                Tanggal Lahir
              </label>

              <div className="col-span-9 relative">
                <CalendarDays
                  size={21}
                  className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  name="tanggallahir"
                  type="date"
                  defaultValue={
                    balita?.tanggallahir
                      ? new Date(balita.tanggallahir)
                          .toISOString()
                          .split("T")[0]
                      : ""
                  }
                  placeholder="Masukan Tanggal lahir"
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

            {/* Jenis Kelamin */}
            <div className="flex flex-col gap-2 w-full">
              <label className="col-span-3 flex items-center gap-3 text-[17px] font-medium text-slate-800">
                <div className="w-3 h-3 rounded-full bg-cyan-500" />
                Jenis Kelamin
              </label>

              <div className="col-span-9 relative">
                <VenusAndMars
                  size={21}
                  className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <select
                  name="jeniskelamin"
                  defaultValue={balita?.jeniskelamin ?? ""}
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
                  <option>Laki-laki</option>
                  <option>Perempuan</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            {/*BERAT BADAN */}
            <div className="flex flex-col gap-2 w-full">
              <label className="col-span-3 flex items-center gap-3 text-[17px] font-medium text-slate-800">
                <div className="w-3 h-3 rounded-full bg-cyan-500" />
                BB Lahir
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
                  defaultValue={balita?.bblahir ? balita.bblahir : ""}
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
                TB Lahir
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
                  defaultValue={balita?.tblahir ? balita.tblahir : ""}
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
          </div>
             <div className="flex gap-3">
            {/* Inisiasi Menyusu Dini */}
<div className="flex flex-col gap-2 w-full">
  <label className="flex items-center gap-3 text-[17px] font-medium text-slate-800">
    <div className="w-3 h-3 rounded-full bg-cyan-500" />
    Inisiasi Menyusu Dini (IMD)
  </label>

  <div className="relative">
    <select
      name="imd"
      defaultValue={
        balita?.imd === null || balita?.imd === undefined
          ? ""
          : String(balita.imd)
      }
      className="
        w-full
        h-[50px]
        rounded-[5px]
        border
        border-gray-300
        bg-white
        px-4
        pr-10
        text-[15px]
        text-black
        outline-none
        focus:border-cyan-500
        transition
      "
    >
      <option value="">Pilih Status IMD</option>
      <option value="true">Ya</option>
      <option value="false">Tidak</option>
    </select>
  </div>
</div>

{/* Kepemilikan Buku KIA/KMS */}
<div className="flex flex-col gap-2 w-full">
  <label className="flex items-center gap-3 text-[17px] font-medium text-slate-800">
    <div className="w-3 h-3 rounded-full bg-cyan-500" />
    Kepemilikan buku KIA
  </label>

  <div className="relative">
    <select
      name="kpb"
      defaultValue={
        balita?.buku_kia === null || balita?.buku_kia === undefined
          ? ""
          : String(balita.buku_kia)
      }
      className="
        w-full
        h-[50px]
        rounded-[5px]
        border
        border-gray-300
        bg-white
        px-4
        pr-10
        text-[15px]
        text-black
        outline-none
        focus:border-cyan-500
        transition
      "
    >
      <option value="">Pilih Status Kepemilikan Buku KIA</option>
      <option value="true">Ya</option>
      <option value="false">Tidak</option>
    </select>
  </div>
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
          onClick={() => router.push("/admin/dashboard/data-balita")}
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
          <X size={26} />
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
          <Save size={26} />
          {mode === "create" ? "Simpan Data" : "Update Data"}
        </button>
      </div>
    </form>
  );
}
