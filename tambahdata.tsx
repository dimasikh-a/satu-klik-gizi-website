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
import { balita } from "@prisma/client";
type UserFormProps = {
  mode: "create" | "edit";
  balita?: balita;
  action: (formData: FormData) => void;
};

export default function UserForm({ mode, balita, action }: UserFormProps) {
  const router = useRouter();

  return (
    <form action={action}>
      <div className="px-6 pb-6">
        <div className="space-y-3">
          <div className="flex gap-3">
            {/* KIA */}
            <div className="flex flex-col gap-2 w-full">
              <label className="col-span-3 flex items-center gap-3 text-[17px] font-medium text-slate-800">
                <div className="w-3 h-3 rounded-full bg-cyan-500" />
                KIA
              </label>

              <div className="col-span-9 relative">
                <Hash
                  size={21}
                  className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  name="no_kia"
                  defaultValue={balita?.no_kia ?? ""}
                  type="text"
                  placeholder="Masukan Id"
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
            <div className="flex flex-col gap-2 w-full">
              <label className="col-span-3 flex items-center gap-3 text-[17px] font-medium text-slate-800">
                <div className="w-3 h-3 rounded-full bg-cyan-500" />
                No KK
              </label>

              <div className="col-span-9 relative">
                <IdCard
                  size={21}
                  className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  name="nokk"
                  defaultValue={balita?.nokk ?? ""}
                  type="text"
                  placeholder="Masukan No KK"
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
                  type="text"
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
                Berat Badan
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
                  defaultValue={balita?.bb ? balita.bb.toNumber() : ""}
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
                Tinggi Badan
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
                  defaultValue={balita?.tb ? balita.tb.toNumber() : ""}
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
