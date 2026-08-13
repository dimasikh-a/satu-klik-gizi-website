"use client";

import Link from "next/link";
import { Pencil, Search, Trash2, UserPlus } from "lucide-react";
import { deleteRecommendation } from "@/features/rekomendasi/delete-recommendation";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { rekomendasi } from "@prisma/client";
import { getPermission } from "@/lib/permission";
import { getRecommendationColor } from "@/lib/recommendation-color";

type Props = {
  rekomendasi: rekomendasi[];
  search: string;
  currentPage: number;
  totalPages: number;
  status: string;
};

export default function DataRecommendationPage({
  rekomendasi,
  search,
  currentPage,
  status,
  totalPages,
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
    if (!selectedRecommendation) return;

    try {
      await deleteRecommendation(Number(selectedRecommendation.idrekomendasi));

      toast.success("Data user berhasil dihapus");

      setOpenDelete(false);

      window.location.reload();
    } catch {
      toast.error("Gagal menghapus data user");
    }
  }
  const [openDelete, setOpenDelete] = useState(false);

  const [selectedRecommendation, setSelectedRecommendation] = useState<{
    idrekomendasi: number;
  } | null>(null);
  return (
    <div className="mt-20 font-mono w-full min-w-0">
      <div className="min-h-screen bg-[#F7FAFC] w-full">
        {/* HEADER */}
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-teal-600">Data User</h1>

            <p className="mt-1 text-base text-slate-600">
              Kelola seluruh data rekomendasi
            </p>
          </div>

          {canCreate && (
            <Link
              href="/admin/dashboard/data-rekomendasi/tambah-data"
              className="flex items-center justify-center gap-3 bg-teal-600 hover:opacity-90 transition text-white font-semibold px-4 py-3 rounded-xl shadow-sm"
            >
              <UserPlus size={22} />
              <span>Tambah Data</span>
            </Link>
          )}
        </div>

        {/* SEARCH */}
        <div className="mt-4 p-2">
          <form
            onSubmit={(e) => {
              e.preventDefault();

              if (!keyword.trim()) {
                router.push("/admin/dashboard/data-rekomendasi");
                return;
              }

              router.push(
                `/admin/dashboard/data-rekomendasi?q=${encodeURIComponent(
                  keyword,
                )}`,
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
                    Id Rekomendasi
                  </th>

                  <th className="px-6 py-5 text-center font-bold text-slate-700">
                    Hasil Analisis
                  </th>

                  <th className="px-6 py-5 text-center font-bold text-slate-700">
                    Rekomendasi
                  </th>

                  {showActionColumn && (
                    <th className="px-6 py-5 text-center font-bold text-slate-700">
                      Aksi
                    </th>
                  )}
                </tr>
              </thead>

              <tbody>
                {rekomendasi.map((rekomendasi, index) => (
                  <tr
                    key={rekomendasi.idrekomendasi}
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

                    {/* HASIL ANALISIS */}
                    <td className="px-4 py-3">
                      <span
                        className={`
      inline-flex
      rounded-full
      px-4
      py-2
      text-sm
      font-semibold
      ${getRecommendationColor(rekomendasi.kategori)}
    `}
                      >
                        {rekomendasi.kategori}
                      </span>
                    </td>

                    {/* REKOMENDASI*/}
                    <td className="px-6 py-6 text-center text-slate-600">
                      {rekomendasi.deskripsi}
                    </td>

                    {/* AKSI */}
                    {showActionColumn && (
                      <td className="px-6 py-6">
                        <div className="flex items-center justify-center gap-3">
                          {canUpdate && (
                            <Link
                              href={`/admin/dashboard/data-rekomendasi/edit/${rekomendasi.idrekomendasi}`}
                              className="
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-xl
            bg-cyan-100
            transition
            hover:bg-cyan-200
          "
                            >
                              <Pencil size={20} className="text-cyan-700" />
                            </Link>
                          )}

                          {canDelete && (
                            <form
                              action={deleteRecommendation.bind(
                                null,
                                rekomendasi.idrekomendasi,
                              )}
                            >
                              <button
                                className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-xl
              bg-red-100
              transition
              hover:bg-red-200
            "
                              >
                                <Trash2 size={20} className="text-red-600" />
                              </button>
                            </form>
                          )}
                        </div>
                      </td>
                    )}
                  </tr>
                ))}

                {rekomendasi.length === 0 && (
                  <tr>
                    <td
                      colSpan={showActionColumn ? 8 : 7}
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

                router.push(`/admin/dashboard/data-rekomendasi?${params.toString()}`);
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
