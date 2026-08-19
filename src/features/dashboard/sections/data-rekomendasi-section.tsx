"use client";

import Link from "next/link";
import {  Search,} from "lucide-react";
import { deleteRekomendasi } from "@/features/rekomendasi/delete-recommendation";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { getPermission } from "@/lib/permission";

type Rekomendasi = {
  idrekomendasi: number;

  deskripsi: string;

  created_at: Date;

  updated_at: Date;

  pemeriksaan: {
    idperiksa: number;

    tglperiksa: Date;

    bb: number;

    tb: number;

    umur_bulan: number;

    asi_eksklusif: string | null;

    cara_pengukuran: string | null;

    statusbb: string | null;

    statustb: string | null;

    hasilgizi: string | null;

    balita: {
      namaanak: string;

      nik_anak: string | null;

      jeniskelamin: string;

      tanggallahir: Date;

      orang_tua: {
        nama_ibu: string;

        nama_ayah: string | null;
      };
    };
  };
};

type Props = {
  rekomendasi: Rekomendasi[];

  search: string;

  currentPage: number;

  totalPages: number;

  status: string;
};

export default function DataRekomendasiPage({
  rekomendasi,
  search,
  currentPage,
  totalPages,
  status,
}: Props) {
  const permission = getPermission(status);

  const PAGE_SIZE = 5;

  const [keyword, setKeyword] = useState(search ?? "");

  const router = useRouter();

  const canCreate = permission.rekomendasi.create;
  const canUpdate = permission.rekomendasi.update;
  const canDelete = permission.rekomendasi.delete;

  const showActionColumn = canUpdate || canDelete;

  const [openDelete, setOpenDelete] = useState(false);

  const [selectedRekomendasi, setSelectedRekomendasi] = useState<{
    id: number;
  } | null>(null);

  async function handleDelete() {
    if (!selectedRekomendasi) return;

    try {
      await deleteRekomendasi(selectedRekomendasi.id);

      toast.success("Data rekomendasi berhasil dihapus.");

      setOpenDelete(false);

      router.refresh();
    } catch {
      toast.error("Gagal menghapus data rekomendasi.");
    }
  }
  return (
    <>
      <div className="mt-20 font-mono w-full min-w-0">
        <div className=" bg-[#F7FAFC] w-full">
          {/* HEADER */}
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-teal-600">
                Data Rekomendasi
              </h1>

              <p className="mt-1 text-base text-slate-600">
                Kelola seluruh data Rekomendasi
              </p>
            </div>
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
                  `/admin/dashboard/data-rekomendasi?q=${encodeURIComponent(keyword)}`,
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
                      Rekomedasi
                    </th>

                    <th className="px-6 py-5 text-center font-bold text-slate-700">
                      Aksi
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {rekomendasi.map((r, index) => (
                    <tr
                      key={r.idrekomendasi}
                      className="
        border-b
        border-slate-100
        transition
        hover:bg-slate-50
      "
                    >
                      {/* NO */}
                      <td className="px-6 py-6 text-center text-slate-600">
                        {(currentPage - 1) * PAGE_SIZE + index + 1}
                      </td>

                      {/* Nama Anak */}
                      <td className="px-6 py-6 text-center font-bold text-slate-900">
                        {r.pemeriksaan.balita.namaanak}
                      </td>

                      {/* Umur */}
                      <td className="px-6 py-6 text-center text-slate-600">
                        {r.pemeriksaan.umur_bulan} Bulan
                      </td>

                      {/* BB */}
                      <td className="px-6 py-6 text-center text-slate-600">
                        {r.pemeriksaan.bb} Kg
                      </td>

                      {/* Status BB */}
                      <td className="px-6 py-6 text-center text-slate-600">
                        {r.pemeriksaan.statusbb ?? "-"}
                      </td>

                      {/* TB */}
                      <td className="px-6 py-6 text-center text-slate-600">
                        {r.pemeriksaan.tb} Cm
                      </td>

                      {/* Status TB */}
                      <td className="px-6 py-6 text-center text-slate-600">
                        {r.pemeriksaan.statustb ?? "-"}
                      </td>

                      {/* Hasil Gizi */}
                      <td className="px-6 py-6 text-center text-slate-600">
                        {r.pemeriksaan.hasilgizi ?? "-"}
                      </td>

                      {/* Cara Pengukuran */}
                      <td className="px-6 py-6 text-center text-slate-600">
                        {r.pemeriksaan.cara_pengukuran ?? "-"}
                      </td>

                      {/* Rekomendasi */}
                      <td className="px-6 py-6 text-slate-600">
                        {r.deskripsi}
                      </td>

                      {/* AKSI */}
                      {showActionColumn && (
                        <td className="px-6 py-6">
                          <div className="flex items-center justify-center gap-3">
 {/* EDIT */}
{canUpdate && (
  <Link
    href={`/admin/dashboard/data-rekomendasi/edit/${r.pemeriksaan.idperiksa}`}
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
  </Link>
)}

{/* DELETE */}
{canDelete && (
<form
  action={deleteRekomendasi.bind(
    null,
    r.idrekomendasi
  )}
>
  <button
    type="submit"
    className="
      flex h-10 items-center justify-center
      rounded-lg
      bg-red-100 px-4
      text-sm font-medium
      text-red-700
      transition-all duration-200
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
                  ))}

                  {rekomendasi.length === 0 && (
                    <tr>
                      <td
                        colSpan={10}
                        className="
          py-10
          text-center
          text-slate-500
        "
                      >
                        Belum ada data rekomendasi.
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
                    `/admin/dashboard/data-rekomendasi?${params.toString()}`,
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
