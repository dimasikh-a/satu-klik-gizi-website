"use client";

import Link from "next/link";
import { Pencil, Search, Trash2, UserPlus } from "lucide-react";
import { deletePemeriksaan } from "@/features/pemeriksaan/delete-pemeriksaan";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { getPermission } from "@/lib/permission";

type Pemeriksaan = {
  idperiksa: number;
  tglperiksa: Date;
  bb: number;
  tb: number;
  umur_bulan: number;

  asi_eksklusif: boolean | null;

  cara_pengukuran: string | null;
  statustb: string | null;
  statusbb: string | null;
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

rekomendasi_bb: {
    kategori: string;
    deskripsi: string;
  } | null;

  rekomendasi_tb: {
    kategori: string;
    deskripsi: string;
  } | null;
};

type Props = {
  pemeriksa: Pemeriksaan[];
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
  status
}: Props) {
  const permission = getPermission(status);
  const page_size = 5;
  const [keyword, setKeyword] = useState(search ?? "");
  const router = useRouter();
  const canCreate = permission.pemeriksaan.create;
  const canUpdate = permission.pemeriksaan.update;
  const canDelete = permission.pemeriksaan.delete;
  const showActionColumn = canUpdate || canDelete;
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

            {canCreate && ( <Link
              href="/admin/dashboard/data-pemeriksaan/tambah-data"
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
          </div>

          {/* TABLE */}
          <div className="mt-5 rounded-[32px] border border-slate-200 bg-white shadow-md">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1200px]">
                <thead className="border-b border-slate-200 bg-slate-50">
                  <tr>
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
                      Rekomendasi
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
                  {pemeriksa.map((p, index) => (
                    <tr
                      key={p.idperiksa}
                      className="
                      border-b
                      border-slate-100
                      transition
                      hover:bg-slate-50
                    "
                    >

                      {/* Nama anak */}
                      <td className="px-6 py-6 text-center font-bold text-slate-900">
                        {p.balita.namaanak}
                      </td>

                      {/* Umur */}
                      <td className="px-6 py-6 text-center text-slate-600">
                        {p.umur_bulan}
                      </td>

                      {/* BB */}
                      <td className="px-6 py-6 text-center text-slate-600">
                        {p.bb} KG
                      </td>

                      {/*Status BB */}
                      <td className="px-6 py-6 text-center text-slate-600">
                        {p.statusbb}
                      </td>

                      {/* TB */}
                      <td className="px-6 py-6 text-center text-slate-600">
                        {p.tb} CM 
                      </td>

                      {/* Status TB */}
                      <td className="px-6 py-6 text-center text-slate-600">
                        {p.statustb}
                      </td>
                      {/* Hasil Gizi*/}
                      <td className="px-6 py-6 text-center text-slate-600">
                        {p.hasilgizi ?? "-"}
                      </td>
                      {/* Rekomendasi */}
                      <td className="px-6 py-6 text-center text-slate-600">
                        {p.statustb ?? "-"}
                      </td>
                      {/* Cara pengukuran */}
                      <td className="px-6 py-6 text-center text-slate-600">
                        {p.cara_pengukuran ?? "-"}
                      </td>

                      {/* AKSI */}
                      {showActionColumn && (
                      <td className="px-6 py-6">
                        <div className="flex items-center justify-center gap-3">
                          
                          {/* EDIT */}
                          {canUpdate && (
                          <Link
                            href={`/admin/dashboard/data-pemeriksaan/edit/${p.idperiksa}`}
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

                          {/* DELETE */}
                          {canDelete && ( 
                          <form action={deletePemeriksaan.bind(null, p.idperiksa)}>
                            <button
                              onClick={() => {
                                setSelectedPeriksa({
                                  id: p.idperiksa,
                                });

                                setOpenDelete(true);
                              }}
                              className="
                              flex
                              h-12
                              w-12
                              items-center
                              justify-center
                              rounded-xl
                              bg-red-100
                              hover:bg-red-200
                            "
                            >
                              <Trash2 size={20} className="text-red-600" />
                            </button>
                          </form> )}
                        </div>
                      </td>
                      )}
                    </tr>
                  ))}

                  {pemeriksa.length === 0 && (
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
                    `/admin/dashboard/data-user?${params.toString()}`,
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
