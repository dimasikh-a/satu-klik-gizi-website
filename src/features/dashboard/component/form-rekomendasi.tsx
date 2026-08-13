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
  Star,
} from "lucide-react";
import { Save } from "lucide-react";
import { useRouter } from "next/navigation";

type RekomendasiFormProps = {
  mode: "create" | "edit";
  rekomendasi?: {
    idrekomendasi: number;
    kategori: string | null;
    deskripsi: string | null;
  };
  action: (formData: FormData) => void;
};

export default function RekomendasiForm({
  mode,
  rekomendasi,
  action,
}: RekomendasiFormProps) {
  const router = useRouter();

  return (
    <form action={action}>
      <div className="px-6 pb-5">
        <div className="space-y-3">
          {/* Deskripsi */}
            <div className="flex flex-col gap-3">
              <label className="col-span-3 flex items-center gap-3 text-[18px] font-medium text-slate-800">
                <div className="w-3 h-3 rounded-full bg-cyan-500" />
                Deskripsi
              </label>

              <div className="col-span-9 relative">
                <Star
                  size={21}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  name="deskripsi"
                  placeholder="Masukkan rekomendasi"
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
              </div>
            </div>

          {/* Kategori */}
          <div className="flex flex-col gap-2 w-full">
            <label className=" flex items-center gap-3 text-[18px] font-medium text-slate-800">
              <div className="w-3 h-3 rounded-full bg-cyan-500" />
              kategori
            </label>

            <div className="w-full relative">
              <List
                size={21}
                className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <select
                name="kategori"
                defaultValue={rekomendasi?.kategori ?? ""}
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
                <option value="Berat Badan Sangat Kurang (Severely Wasted)">Berat Badan Sangat Kurang (Severely Wasted)</option>
                <option value="Berat Badan Kurang (Wasted)">Berat Badan Kurang (Wasted)</option>
                <option value="Berat Badan Normal (Normal)">Berat Badan Normal (Normal)</option>
                <option value="Risiko Berat Badan Lebih (Overweight/Obesitas)">Risiko Berat Badan Lebih (Overweight/Obesitas)</option>
                <option value="Sangat Pendek (Severely Stunted)">Sangat Pendek (Severely Stunted)</option>
                <option value="Pendek (Stunted)">Pendek (Stunted)</option>
                <option value="Normal (Tinggi Badan Normal)">Normal (Tinggi Badan Normal)</option>
                <option value="Tinggi">Tinggi</option>
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
