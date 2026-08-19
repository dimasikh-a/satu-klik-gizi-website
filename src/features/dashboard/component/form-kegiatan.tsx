"use client";

import {
  ClipboardList,
  Hash,
  CalendarDays,
  Clock3,
  MapPin,
  PencilLine,
  Upload,
  FileText,
  Save,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

type KegiatanFormProps = {
  mode: "create" | "edit";
  activity?: {
    judul_kegiatan: string;
    foto: string | null;
    tanggal_pelaksanaan: Date;
    jam: string;
    tempat: string;
    keterangan: string | null;
  };
  action: (formData: FormData) => void;
};

export default function KegiatanForm({
  mode,
  action,
  activity,
}: KegiatanFormProps) {
  const router = useRouter();

  const [preview, setPreview] = useState<string | null>(activity?.foto ?? null);

  const [fileName, setFileName] = useState<string>("Belum ada file");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert("Ukuran gambar maksimal 2MB");
      return;
    }

    setPreview(URL.createObjectURL(file));
    setFileName(file.name);
  };

  return (
    <form action={action} encType="multipart/form-data">
      <div className="px-6 pb-6">
        <div className="flex gap-12">
          {/* LEFT */}
          <div className="w-[300px]">
            <div className="mb-10">
              <label className="mb-3 block text-lg font-semibold text-slate-800">
                Foto Kegiatan
              </label>

              <input
                type="file"
                id="foto"
                name="foto"
                accept="image/png,image/jpeg,image/jpg"
                className="hidden"
                onChange={handleImageChange}
              />

              <label
                htmlFor="foto"
                className="
            relative
            flex
            h-[320px]
            w-full
            cursor-pointer
            items-center
            justify-center
            overflow-hidden
            rounded-[40px]
            border-4
            border-dashed
            border-cyan-400
            bg-cyan-50
            transition
            hover:bg-cyan-100
          "
              >
                {preview ? (
                  <img
                    src={preview}
                    alt="Preview"
                    className="
                h-full
                w-full
                object-cover
              "
                  />
                ) : (
                  <div className="text-center">
                    <Upload
                      size={70}
                      className="
                  mx-auto
                  text-cyan-500
                "
                    />

                    <h2
                      className="
                  mt-4
                  text-2xl
                  font-bold
                  text-cyan-600
                "
                    >
                      Upload Gambar
                    </h2>

                    <p className="mt-1 px-2 text-base text-slate-500">
                      Klik disini
                    </p>
                  </div>
                )}
              </label>

              <div className="mt-5 flex flex-col gap-4">
                <label
                  htmlFor="foto"
                  className="
              flex
              cursor-pointer
              items-center
              gap-3
              justify-center
              rounded-2xl
              bg-teal-600
              px-5
              h-12
              font-semibold
              text-white
              transition
              hover:bg-teal-700
            "
                >
                  <Upload size={20} />
                  Upload
                </label>

                <div
                  className="
              flex
              items-center
              rounded-2xl
              border
              border-slate-300
              px-6
              justify-center
              text-sm
                h-12
              text-slate-600
            "
                >
                  {fileName}
                </div>
              </div>

              <p className="mt-4 text-sm text-slate-500">
                Format: JPG, PNG • Maks. 2MB
              </p>
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex flex-col w-full">
            <div className="space-y-5">
              {/* JUDUL KEGIATAN */}
              <div className="flex flex-col items-start gap-1.5 w-full">
                <label className="col-span-4 flex items-center gap-3 text-[17px] font-semibold text-slate-800">
                  <div className="w-3 h-3 rounded-full bg-cyan-500" />
                  Judul Kegiatan
                </label>

                <div className="col-span-8 relative w-full">
                  <Hash
                    size={17}
                    className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    name="judul_kegiatan"
                    type="text"
                    defaultValue={activity?.judul_kegiatan ?? ""}
                    placeholder="Masukkan judul kegiatan"
                    className="
                        w-full
                        h-[40px]
                        rounded-[5px]
                        border
                        border-gray-300
                        bg-white
                        pl-12
                        pr-5
                        text-black
                        text-[14px]
                        outline-none
                        focus:border-cyan-500
                        transition
                      "
                  />
                </div>
              </div>
              {/* TANGGAL */}
              <div className="flex flex-col items-start gap-1.5 w-full">
                <label className="col-span-4 flex items-center gap-3 text-[17px] font-semibold text-slate-800">
                  <div className="w-3 h-3 rounded-full bg-cyan-500" />
                  Tanggal Pelaksanaan
                </label>

                <div className="col-span-8 relative w-full">
                  <CalendarDays
                    size={17}
                    className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    name="tanggal_pelaksanaan"
                    type="date"
                    defaultValue={
                      activity?.tanggal_pelaksanaan
                        ? new Date(activity.tanggal_pelaksanaan)
                            .toISOString()
                            .split("T")[0]
                        : ""
                    }
                    placeholder="Masukkan Tanggal Kegiatan"
                    className="
                        w-full
                        h-[40px]
                        rounded-[5px]
                        border
                        border-gray-300
                        bg-white
                        pl-12
                        pr-5
                        text-black
                        text-[14px]
                        outline-none
                        focus:border-cyan-500
                        transition
                      "
                  />
                </div>
              </div>

              {/* JAM */}
              <div className="flex flex-col items-start gap-1.5 w-full">
                <label className="col-span-4 flex items-center gap-1.5 text-[17px] font-semibold text-slate-800">
                  <div className="w-3 h-3 rounded-full bg-cyan-500" />
                  Jam
                </label>

                <div className="col-span-8 relative w-full">
                  <Clock3
                    size={19}
                    className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    name="jam"
                    type="time"
                    placeholder="Masukkan Jam Kegiatan"
                    defaultValue={activity?.jam??""}
                    className="
                        w-full
                        h-[40px]
                        rounded-[5px]
                        border
                        border-gray-300
                        bg-white
                        pl-12
                        pr-5
                        text-black
                        text-[14px]
                        outline-none
                        focus:border-cyan-500
                        transition
                      "
                  />
                </div>
              </div>

              {/* TEMPAT */}
              <div className="flex flex-col items-start gap-1.5 w-full">
                <label className="col-span-4 flex items-center gap-1.5 text-[17px] font-semibold text-slate-800">
                  <div className="w-3 h-3 rounded-full bg-cyan-500" />
                  Tempat
                </label>

                <div className="col-span-8 relative w-full">
                  <MapPin
                    size={17}
                    className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="text"
                    name="tempat"
                    defaultValue={activity?.tempat??""}
                    placeholder="Masukkan Tempat"
                    className="
                        w-full
                        h-[40px]
                        rounded-[5px]
                        border
                        border-gray-300
                        bg-white
                        pl-12
                        pr-5
                        text-black
                        text-[14px]
                        outline-none
                        focus:border-cyan-500
                        transition
                      "
                  />
                </div>
              </div>

              {/* KETERANGAN */}
              <div className="flex flex-col gap-1.5">
                <label className="col-span-4 flex items-start gap-3 text-[17px] font-semibold text-slate-800">
                  <div className="w-3 h-3 rounded-full bg-cyan-500 mt-3" />
                  Keterangan
                </label>

                <div className="col-span-8 relative">
                  <PencilLine
                    size={19}
                    className="absolute left-5 top-6 text-slate-400"
                  />

                  <textarea
                  name="keterangan"
                  defaultValue={activity?.keterangan??""}
                    placeholder="Masukkan keterangan kegiatan"
                    className="
                        w-full
                        h-[180px]
                        rounded-2xl
                        border
                        border-gray-300
                        bg-white
                        pl-16
                        pr-5
                        text-black
                        pt-5
                        text-[14px]
                        outline-none
                        resize-none
                        focus:border-cyan-500
                        transition
                      "
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
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
          onClick={() => router.push("/admin/dashboard/data-kegiatan")}
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
