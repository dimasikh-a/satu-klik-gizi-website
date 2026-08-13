"use client";

import {
  User,
  MapPin,
  Phone,
  List,
  Lock,
  Eye,
  ChevronDown,
  X,
  Locate,
} from "lucide-react";
import { Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { orang_tua } from "@prisma/client";

type ParentFormProps = {
  mode: "create" | "edit";
  parent?: orang_tua
  action: (formData: FormData) => void;
};

export default function ParentForm({ mode, parent, action }: ParentFormProps) {
  const router = useRouter();

  return (
    <form action={action}>
      <div className="px-6 pb-5">
        <div className="space-y-3">
          {/* NO KK*/}
          <div className="flex flex-col gap-2 w-[800px]">
            <label className="col-span-3 flex items-center gap-3 text-[18px] font-medium text-slate-800">
              <div className="w-3 h-3 rounded-full bg-cyan-500" />
              No KK
            </label>

            <div className="col-span-9 relative">
              <Phone
                size={21}
                className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                name="nokk"
                defaultValue={parent?.nokk?? ""}
                type="text"
                placeholder="Masukkan No KK"
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
          <div className="flex gap-3">
            {/* NAMA IBU */}
            <div className="flex flex-col gap-2 w-[80%]">
              <label className="col-span-3 flex items-center gap-3 text-[18px] font-medium text-slate-800">
                <div className="w-3 h-3 rounded-full bg-cyan-500" />
                Nama Ibu
              </label>

              <div className="col-span-9 relative">
                <User
                  size={21}
                  className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  name="namaibu"
                  defaultValue={parent?.nama_ibu ?? ""}
                  type="text"
                  placeholder="Masukkan Nama Ibu "
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

            {/* NIK IBU */}
            <div className="flex flex-col gap-2 w-full">
              <label className="col-span-3 flex items-center gap-3 text-[18px] font-medium text-slate-800">
                <div className="w-3 h-3 rounded-full bg-cyan-500" />
                Nik Ibu
              </label>

              <div className="col-span-9 relative">
                <User
                  size={21}
                  className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  name="nikibu"
                  defaultValue={parent?.nik_ibu?? ""}
                  type="text"
                  placeholder="Masukkan Nik Ibu"
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
            {/* NAMA AYAH */}
            <div className="flex flex-col gap-2 w-[80%]">
              <label className="col-span-3 flex items-center gap-3 text-[18px] font-medium text-slate-800">
                <div className="w-3 h-3 rounded-full bg-cyan-500" />
                Nama Ayah
              </label>

              <div className="col-span-9 relative">
                <User
                  size={21}
                  className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  name="namaayah"
                  defaultValue={parent?.nama_ayah ?? ""}
                  type="text"
                  placeholder="Masukkan Nama Ayah "
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

            {/* NIK AYAH */}
            <div className="flex flex-col gap-2 w-full">
              <label className="col-span-3 flex items-center gap-3 text-[18px] font-medium text-slate-800">
                <div className="w-3 h-3 rounded-full bg-cyan-500" />
                Nik Ayah
              </label>

              <div className="col-span-9 relative">
                <User
                  size={21}
                  className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  name="nikayah"
                  defaultValue={parent?.nik_ayah?? ""}
                  type="text"
                  placeholder="Masukkan Nik Ayah"
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
            {/* NO TELP */}
            <div className="flex flex-col gap-2 w-[80%]">
              <label className="col-span-3 flex items-center gap-3 text-[18px] font-medium text-slate-800">
                <div className="w-3 h-3 rounded-full bg-cyan-500" />
                No. Telp
              </label>

              <div className="col-span-9 relative">
                <Phone
                  size={21}
                  className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  name="notelp"
                  type="text"
                  defaultValue={parent?.no_telp_hp ?? ""}
                  placeholder="Masukan No Telp"
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

            {/* ALAMAT*/}
            <div className="flex flex-col gap-2 w-[800px]">
              <label className="col-span-3 flex items-center gap-3 text-[18px] font-medium text-slate-800">
                <div className="w-3 h-3 rounded-full bg-cyan-500" />
                Alamat
              </label>

              <div className="col-span-9 relative">
                <MapPin
                  size={21}
                  className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  name="alamat"
                  defaultValue={parent?.alamat ?? ""}
                  type="text"
                  placeholder="Masukkan Alamat "
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
            {/* RT */}
            <div className="flex flex-col gap-2 w-[80%]">
              <label className="col-span-3 flex items-center gap-3 text-[18px] font-medium text-slate-800">
                <div className="w-3 h-3 rounded-full bg-cyan-500" />
                RT
              </label>

              <div className="col-span-9 relative">
                <MapPin
                  size={21}
                  className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  name="rt"
                  type="text"
                  defaultValue={parent?.rt ?? ""}
                  placeholder="Masukan RT"
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

            {/* RW*/}
            <div className="flex flex-col gap-2 w-[800px]">
              <label className="col-span-3 flex items-center gap-3 text-[18px] font-medium text-slate-800">
                <div className="w-3 h-3 rounded-full bg-cyan-500" />
                RW
              </label>

              <div className="col-span-9 relative">
                <MapPin
                  size={21}
                  className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  name="rw"
                  defaultValue={parent?.rw ?? ""}
                  type="text"
                  placeholder="Masukkan RW "
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
          onClick={() => router.push("/admin/dashboard/data-orang-tua")}
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
