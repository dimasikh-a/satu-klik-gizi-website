"use client";

import Link from "next/link";
import { Search, Trash2, UserPlus } from "lucide-react";
import { deletePemeriksaan } from "@/features/pemeriksaan/delete-pemeriksaan";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { getPermission } from "@/lib/permission";
import { PemeriksaanList } from "@/features/pemeriksaan/types";

type Props = {
  pemeriksa: PemeriksaanList[];
  search: string;
  currentPage: number;
  totalPages: number;
  status: string;
};

export default function DataPemeriksaanPage({
  pemeriksa,
  search,
  currentPage,
  totalPages,
  status,
}: Props) {
  const permission = getPermission(status);
  const page_size = 5;
  const [keyword, setKeyword] = useState(search ?? "");
  const router = useRouter();
  const [recommendationFilter, setRecommendationFilter] = useState<
    "all" | "recommended" | "not-recommended"
  >("all");

  console.log("========== DEBUG PERMISSION ==========");
  console.log("STATUS USER:", status);
  console.log("PERMISSION:", permission);
  console.log("PEMERIKSAAN:", permission.pemeriksaan);
  console.log("RECOMMENDATION:", permission.pemeriksaan.recommendation);
  console.log("======================================");

  const canView = permission.pemeriksaan?.view === true;

  const canCreate = permission.pemeriksaan?.create === true;

  const canUpdate = permission.pemeriksaan?.update === true;

  const canDelete = permission.pemeriksaan?.delete === true;

  const canRecommendation = permission.pemeriksaan?.recommendation === true;
  const showActionColumn = canUpdate || canDelete || canRecommendation;
  async function handleDelete() {
    if (!selectedPeriksa) return;

    try {
      await deletePemeriksaan(selectedPeriksa.id);

      toast.success("Data pemeriksaan berhasil dihapus");

      setOpenDelete(false);

      window.location.reload();
    } catch {
      toast.error("Gagal menghapus data pemeriksaan");
    }
  }
  const [openDelete, setOpenDelete] = useState(false);

  const [selectedPeriksa, setSelectedPeriksa] = useState<{
    id: number;
  } | null>(null);
  const filteredPemeriksa = pemeriksa.filter((p) => {
    const hasRecommendation = p.rekomendasi !== null;

    if (recommendationFilter === "recommended") {
      return hasRecommendation;
    }

    if (recommendationFilter === "not-recommended") {
      return !hasRecommendation;
    }

    return true;
  });
  return (
    <>
      <div className="mt-20 font-mono w-full min-w-0">
        <div className=" bg-[#F7FAFC] w-full">
          {/* HEADER */}
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-teal-600">
                Data Pemeriksaan
              </h1>

              <p className="mt-1 text-base text-slate-600">
                Kelola seluruh data pemeriksaan
              </p>
            </div>

            {canCreate && (
              <Link
                href="/admin/dashboard/data-pemeriksaan/tambah-data"
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
                  router.push("/admin/dashboard/data-user");
                  return;
                }

                router.push(
                  `/admin/dashboard/data-pemeriksaan?q=${encodeURIComponent(keyword)}`,
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
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="mr-2 text-sm font-semibold text-slate-600">
                Filter:
              </span>

              {/* SEMUA */}
              <button
                type="button"
                onClick={() => setRecommendationFilter("all")}
                className={`
      rounded-lg px-4 py-2 text-sm font-medium
      transition-all duration-200
      ${
        recommendationFilter === "all"
          ? "bg-teal-600 text-white"
          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
      }
    `}
              >
                Semua
              </button>

              {/* SUDAH DIREKOMENDASI */}
              <button
                type="button"
                onClick={() => setRecommendationFilter("recommended")}
                className={`
      rounded-lg px-4 py-2 text-sm font-medium
      transition-all duration-200
      ${
        recommendationFilter === "recommended"
          ? "bg-blue-600 text-white"
          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
      }
    `}
              >
                Sudah Direkomendasi
              </button>

              {/* BELUM DIREKOMENDASI */}
              <button
                type="button"
                onClick={() => setRecommendationFilter("not-recommended")}
                className={`
      rounded-lg px-4 py-2 text-sm font-medium
      transition-all duration-200
      ${
        recommendationFilter === "not-recommended"
          ? "bg-orange-500 text-white"
          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
      }
    `}
              >
                Belum Direkomendasi
              </button>
            </div>
          </div>

          {/* TABLE */}
          <div className="mt-5 rounded-[32px] border border-slate-200 bg-white shadow-md">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1200px]">
                <thead className="border-b border-slate-200 bg-slate-50">
                  <tr>
                    <th className="px-6 py-5 text-center font-bold text-slate-700">
                      No
                    </th>
                    <th className="px-6 py-5 text-center font-bold text-slate-700">
                      Nama Anak
                    </th>

                    <th className="px-6 py-5 text-center font-bold text-slate-700">
                      Umur
                    </th>

                    <th className="px-6 py-5 text-center font-bold text-slate-700">
                      BB
                    </th>

                    <th className="px-6 py-5 text-center font-bold text-slate-700">
                      Status BB/U
                    </th>

                    <th className="px-6 py-5 text-center font-bold text-slate-700">
                      TB
                    </th>

                    <th className="px-6 py-5 text-center font-bold text-slate-700">
                      Status TB/U
                    </th>
                    <th className="px-6 py-5 text-center font-bold text-slate-700">
                      Hasil Gizi
                    </th>
                    <th className="px-6 py-5 text-center font-bold text-slate-700">
                      Cara Pengukuran
                    </th>

                    <th className="px-6 py-5 text-center font-bold text-slate-700">
                      Aksi
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredPemeriksa.map((p, index) => {
                    // Cek apakah pemeriksaan ini sudah memiliki rekomendasi
                    const hasRecommendation = p.rekomendasi !== null;

                    return (
                      <tr
                        key={p.idperiksa}
                        className="
          border-b
          border-slate-100
          transition
          hover:bg-slate-50
        "
                      >
                        <td className="px-6 py-6 text-center font-semibold text-slate-900">
                          {(currentPage - 1) * page_size + index + 1}
                        </td>
                        {/* Nama Anak */}
                        <td className="px-6 py-6 text-center font-bold text-slate-900">
                          {p.balita.namaanak}
                        </td>

                        {/* Umur */}
                        <td className="px-6 py-6 text-center text-slate-600">
                          {p.umur_bulan}
                        </td>

                        {/* BB */}
                        <td className="px-6 py-6 text-center text-slate-600">
                          {Number(p.bb)} KG
                        </td>

                        {/* Status BB */}
                        <td className="px-6 py-6 text-center text-slate-600">
                          {p.statusbb ?? "-"}
                        </td>

                        {/* TB */}
                        <td className="px-6 py-6 text-center text-slate-600">
                          {Number(p.tb)} CM
                        </td>

                        {/* Status TB */}
                        <td className="px-6 py-6 text-center text-slate-600">
                          {p.statustb ?? "-"}
                        </td>

                        {/* Hasil Gizi */}
                        <td className="px-6 py-6 text-center text-slate-600">
                          {p.hasilgizi ?? "-"}
                        </td>

                        {/* Cara Pengukuran */}
                        <td className="px-6 py-6 text-center text-slate-600">
                          {p.cara_pengukuran ?? "-"}
                        </td>

                        {/* AKSI */}
                        {showActionColumn && (
                          <td className="px-6 py-5">
                            <div className="flex items-center justify-center gap-2">
                              {/* EDIT */}
                              {canUpdate && (
                                <Link
                                  href={`/admin/dashboard/data-pemeriksaan/edit/${p.idperiksa}`}
                                  className="
                    flex h-10 items-center justify-center
                    rounded-lg
                    bg-cyan-100 px-4
                    text-sm font-medium text-cyan-700
                    transition-all duration-200
                    hover:bg-cyan-200 hover:text-cyan-800
                  "
                                >
                                  Edit
                                </Link>
                              )}

                              {/* REKOMENDASI */}
                              {canRecommendation &&
                                (hasRecommendation ? (
                                  <button
                                    type="button"
                                    disabled
                                    className="
                      flex h-10
                      items-center
                      justify-center
                      rounded-lg
                      bg-slate-100
                      px-4
                      text-sm
                      font-medium
                      text-slate-400
                      cursor-not-allowed
                    "
                                  >
                                    Sudah Direkomendasi
                                  </button>
                                ) : (
                                  <Link
                                    href={`/admin/dashboard/data-rekomendasi/edit/${p.idperiksa}`}
                                    className="
                      flex h-10
                      items-center
                      justify-center
                      rounded-lg
                      bg-blue-100
                      px-4
                      text-sm
                      font-medium
                      text-blue-700
                      transition-all
                      duration-200
                      hover:bg-blue-200
                      hover:text-blue-800
                    "
                                  >
                                    Rekomendasi
                                  </Link>
                                ))}

                              {/* DELETE */}
                              {canDelete && (
                                <form
                                  action={deletePemeriksaan.bind(
                                    null,
                                    p.idperiksa,
                                  )}
                                >
                                  <button
                                    type="submit"
                                    className="
                      flex h-10
                      items-center
                      justify-center
                      rounded-lg
                      bg-red-100
                      px-4
                      text-sm
                      font-medium
                      text-red-700
                      transition-all
                      duration-200
                      hover:bg-red-200
                      hover:text-red-800
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
                    );
                  })}

                  {/* DATA KOSONG */}
                  {filteredPemeriksa.length === 0 && (
                    <tr>
                      <td
                        colSpan={9}
                        className="
          py-10
          text-center
          text-slate-500
        "
                      >
                        Belum ada data pemeriksaan
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

                  router.push(
                    `/admin/dashboard/data-pemeriksaan?${params.toString()}`,
                  );
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
    </>
  );
}
