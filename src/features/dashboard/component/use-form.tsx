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
} from "lucide-react";
import { Save } from "lucide-react";
import { useRouter } from "next/navigation";

type UserFormProps = {
  mode: "create" | "edit";
  user?: {
    id_user: number;
    nama_user: string;
    alamat_user: string;
    no_telp_hp: string;
    status: string;
    jabatan: string;
  };
  action: (formData: FormData) => void;
};

export default function UserForm({ mode, user, action }: UserFormProps) {
  const router = useRouter();

  return (
    <form action={action}>
      <div className="px-6 pb-5">
        <div className="space-y-3">
          {/* Nama user */}
          <div className="flex flex-col gap-2 w-full">
            <label className="col-span-3 flex items-center gap-3 text-[18px] font-medium text-slate-800">
              <div className="w-3 h-3 rounded-full bg-cyan-500" />
              Nama
            </label>

            <div className="col-span-9 relative">
              <User
                size={21}
                className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                name="nama"
                defaultValue={user?.nama_user ?? ""}
                type="text"
                placeholder="Masukkan Nama "
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
            {/* Alamat USer */}
            <div className="flex flex-col gap-2 w-[1200px]">
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
                  type="text"
                  defaultValue={user?.alamat_user ?? ""}
                  placeholder="Masukan Alamat"
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

            {/* No.telp */}
            <div className="flex flex-col gap-2 w-[800px]">
              <label className="col-span-3 flex items-center gap-3 text-[18px] font-medium text-slate-800">
                <div className="w-3 h-3 rounded-full bg-cyan-500" />
                Telepon
              </label>

              <div className="col-span-9 relative">
                <Phone
                  size={21}
                  className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  name="telepon"
                  defaultValue={user?.no_telp_hp ?? ""}
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
          {/* PASSWORD */}
          {mode === "create" && (
            <div className="flex flex-col gap-3">
              <label className="col-span-3 flex items-center gap-3 text-[18px] font-medium text-slate-800">
                <div className="w-3 h-3 rounded-full bg-cyan-500" />
                Password
              </label>

              <div className="col-span-9 relative">
                <Lock
                  size={21}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  name="password"
                  type="password"
                  placeholder="Masukkan password"
                  className="
                  text-black
                    w-full
                    h-[50px]
                    rounded-[5px]
                    border
                    border-gray-300
                    bg-white
                    pl-11
                    pr-6
                    text-[16px]
                    outline-none
                    focus:border-cyan-500
                    transition
                  "
                />

                <Eye
                  size={21}
                  className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400"
                />
              </div>
            </div>
          )}

          {/* STATUS */}
          <div className="flex flex-col gap-2 w-full">
            <label className=" flex items-center gap-3 text-[18px] font-medium text-slate-800">
              <div className="w-3 h-3 rounded-full bg-cyan-500" />
              Status
            </label>

            <div className="w-full relative">
              <List
                size={21}
                className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <select
                name="status"
                defaultValue={user?.status ?? ""}
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
                    appearance-none
                    focus:border-cyan-500
                    transition
                  "
              >
                <option value="Posyandu">Posyandu</option>
                <option value="Nakes">Nakes</option>
                <option value="Ibu">Ibu</option>
              </select>

              <ChevronDown
                size={21}
                className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label className=" flex items-center gap-3 text-[18px] font-medium text-slate-800">
              <div className="w-3 h-3 rounded-full bg-cyan-500" />
              Jabatan
            </label>

            <div className="w-full relative">
              <List
                size={21}
                className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <select
                defaultValue={user?.jabatan ?? ""}
                name="jabatan"
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
                    appearance-none
                    focus:border-cyan-500
                    transition
                  "
              >
                <option value="Ketua Posyandu">Ketua Posyandu</option>
                <option value="Kader Posyandu">Kader Posyandu</option>
                <option value="Operasional">Operasional</option>
                <option value="Pengawas">Pengawas</option>
                <option value="Ibu">Ibu</option>
              </select>

              <ChevronDown
                size={21}
                className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400"
              />
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
          onClick={() => router.push("/admin/dashboard/data-user")}
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
