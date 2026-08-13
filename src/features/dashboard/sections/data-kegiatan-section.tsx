"use client";

import Link from "next/link";
import { Pencil, Search, Trash2, UserPlus } from "lucide-react";
import { deleteActivity } from "@/features/kegiatan/delete-activity";
import { Activity, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Image from "next/image";
import { kegiatan } from "@prisma/client";
import { getPermission } from "@/lib/permission";

type Props = {
  kegiatans: kegiatan[];
  search: string;
  currentPage: number;
  totalPages: number;
  status: string;
};

export default function DataActivitySection({
  kegiatans,
  search,
  currentPage,
  totalPages,
  status,
}: Props) {
  const permission = getPermission(status);
  const page_size = 5;
  const [keyword, setKeyword] = useState(search ?? "");
  const router = useRouter();
  const canCreate = permission.balita.create;
  const canUpdate = permission.balita.update;
  const canDelete = permission.balita.delete;
  const showActionColumn = canUpdate || canDelete;

  async function handleDelete() {
    if (!selectedActivity) return;

    try {
      await deleteActivity(selectedActivity.idkegiatan);

      toast.success("Data kegiatan berhasil dihapus");

      setOpenDelete(false);

      window.location.reload();
    } catch {
      toast.error("Gagal menghapus data kegiatan");
    }
  }
  const [openDelete, setOpenDelete] = useState(false);

  const [selectedActivity, setselectedActivity] = useState<{
    idkegiatan: number;
  } | null>(null);
  return (
    <div className="mt-20 font-mono w-full min-w-0">
      <div className="min-h-screen bg-[#F7FAFC] w-full">
        {/* HEADER */}
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-teal-600">
              Data Kegiatan
            </h1>

            <p className="mt-1 text-base text-slate-600">
              Kelola seluruh data Kegiatan
            </p>
          </div>

          {canCreate && (
          <Link
            href="/admin/dashboard/data-kegiatan/tambah-data"
            className="flex items-center justify-center gap-3 bg-teal-600 hover:opacity-90 transition text-white font-semibold px-4 py-3 rounded-xl shadow-sm"
          >
            <UserPlus size={22} />
            <span>Tambah Data</span>
          </Link> )}
        </div>

        {/* SEARCH */}
        <div className="mt-4 p-2">
          <form
            onSubmit={(e) => {
              e.preventDefault();

              if (!keyword.trim()) {
                router.push("/admin/dashboard/data-kegiatan");
                return;
              }

              router.push(
                `/admin/dashboard/data-kegiatan?q=${encodeURIComponent(keyword)}`,
              );
            }}
          >
            <div className="relative">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Cari user..."
                className="
        h-11
        w-[320px]
        text-black
        rounded-lg
        border
        border-gray-300
        pl-10
        pr-4
      "
              />

              <button
                type="submit"
                className="
        ml-2
        h-11
        rounded-lg
        bg-teal-600
        px-4
        text-white
        cursor-pointer
      "
              >
                Cari
              </button>
            </div>
          </form>
        </div>

        {/* TABLE */}
        <div className="mt-5 rounded-[32px] border border-slate-200 bg-white shadow-md">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1200px]">
              <thead className="border-b border-slate-200 bg-slate-50">
                <tr>
                  <th className="px-6 py-5 text-center font-bold text-slate-700">
                    ID
                  </th>

                  <th className="px-6 py-5 text-center font-bold text-slate-700">
                    Judul
                  </th>

                  <th className="px-6 py-5 text-center font-bold text-slate-700">
                    Foto
                  </th>

                  <th className="px-6 py-5 text-center font-bold text-slate-700">
                    Tanggal Pelaksanaan
                  </th>

                  <th className="px-6 py-5 text-center font-bold text-slate-700">
                    Jam
                  </th>

                  <th className="px-6 py-5 text-center font-bold text-slate-700">
                    Tempat
                  </th>

                  <th className="px-6 py-5 text-center font-bold text-slate-700">
                    Keterangan
                  </th>

                  <th className="px-6 py-5 text-center font-bold text-slate-700">
                    Aksi
                  </th>
                </tr>
              </thead>

              <tbody>
                {kegiatans.map((kegiatan, index) => (
                  <tr
                    key={kegiatan.idkegiatan}
                    className="
                      border-b
                      border-slate-100
                      transition
                      hover:bg-slate-50
                    "
                  >
                    {/* ID */}
                    <td className="px-6 py-6 text-center font-semibold text-slate-900">
                      {(currentPage - 1) * page_size + index + 1}
                    </td>

                    {/* JUDUL KEGIATAN */}
                    <td className="px-6 py-6 text-center font-medium text-slate-700">
                      {kegiatan.judul_kegiatan}
                    </td>

                    {/* FOTO */}
                    <td className="px-6 py-6 text-center font-bold text-slate-900">
                      {kegiatan.foto ? (
                        <Image
                          src={kegiatan.foto}
                          alt="Foto Kegiatan"
                          width={80}
                          height={80}
                          className="
                            rounded-xl
                            object-cover
                          "
                        />
                      ) : (
                        <div
                          className="
                          flex
                          h-20
                          w-20
                          items-center
                          justify-center
                          rounded-xl
                          bg-slate-100
                          text-xs
                          text-slate-400
                        "
                        >
                          Tidak ada foto
                        </div>
                      )}
                    </td>

                    {/* TANGGAL KEGIATAN */}
                    <td className="px-6 py-6 text-center text-slate-600">
                      {new Intl.DateTimeFormat("id-ID", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      }).format(kegiatan.tanggal_pelaksanaan)}
                    </td>

                    {/* JAM */}
                    <td className="px-6 py-6 text-center text-slate-600">
                      {kegiatan.jam}
                    </td>

                    {/* TEMPAT */}
                    <td className="px-6 py-6 text-center font-medium text-slate-700">
                      {kegiatan.tempat}
                    </td>

                    {/* KETERANGAN */}
                    <td className="px-6 py-6 text-center font-medium text-slate-700">
                      {kegiatan.keterangan}
                    </td>

                    {/* AKSI */}
                    {showActionColumn && (
                    <td className="px-6 py-6">
                      <div className="flex items-center justify-center gap-3">
                        {canUpdate && (
                        <Link
                          href={`/admin/dashboard/data-kegiatan/edit/${kegiatan.idkegiatan}`}
                          className="
      flex h-10 items-center justify-center
      rounded-lg px-4
      bg-cyan-100 text-cyan-700
      font-medium
      transition-all duration-200
      hover:bg-cyan-200 hover:text-cyan-800
    "
                          >
                            Edit
                        </Link> )}

                        {/* DELETE */}
                        {canDelete && (
                        <form
                          action={deleteActivity.bind(
                            null,
                            kegiatan.idkegiatan,
                          )}
                        >
                          <button
                            onClick={() => {
                              setselectedActivity({
                                idkegiatan: kegiatan.idkegiatan,
                              });

                              setOpenDelete(true);
                            }}
    className="
      flex h-10 items-center justify-center
      rounded-lg px-4
      bg-red-100 text-red-700
      font-medium
      transition-all duration-200
      hover:bg-red-200 hover:text-red-800
    "
                          >
                           Hapus
                          </button>
                        </form>
                        )}
                      </div>
                    </td>
                    )}
                  </tr>
                ))}

                {kegiatans.length === 0 && (
                  <tr>
                    <td
                      colSpan={7}
                      className="
                        py-10
                        text-center
                        text-slate-500
                      "
                    >
                      Belum ada data user
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* pagination */}
        <div
          className="
    mt-8
    flex
    items-center
    justify-center
    gap-2
  "
        >
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => {
                const params = new URLSearchParams();

                if (search) {
                  params.set("q", search);
                }

                params.set("page", String(page));

                router.push(`/admin/dashboard/data-pemeriksaan?${params.toString()}`);
              }}
              className={`
        h-10
        w-10
        rounded-lg
        border
          cursor-pointer
        ${
          currentPage === page
            ? "bg-teal-600 text-white"
            : "bg-white text-slate-500 border border-slate-500"
        }
      `}
            >
              {page}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
