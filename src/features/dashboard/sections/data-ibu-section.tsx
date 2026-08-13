"use client";

import Link from "next/link";
import { Pencil, Search, Trash2, UserPlus } from "lucide-react";
import { deleteOrangTua } from "@/features/orang-tua/delete-parent";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { getPermission } from "@/lib/permission";
import { orang_tua } from "@prisma/client";

type Props = {
  parents: orang_tua[];
  search: string;
  currentPage: number;
  totalPages: number;
  status: string;
};

export default function DataMotherPage({
  parents,
  search,
  currentPage,
  totalPages,
  status,
}: Props) {
  const page_size = 5;
  const [keyword, setKeyword] = useState(search ?? "");
  const router = useRouter();
  const permission = getPermission(status);
  const canCreate = permission.parent.create;
  const canUpdate = permission.parent.update;
  const canDelete = permission.parent.delete;
  const showActionColumn = canUpdate || canDelete;
  async function handleDelete() {
    if (!selectedUser) return;

    try {
      await deleteOrangTua(selectedUser.nokk);

      toast.success("Data user berhasil dihapus");

      setOpenDelete(false);

      window.location.reload();
    } catch {
      toast.error("Gagal menghapus data user");
    }
  }
  const [openDelete, setOpenDelete] = useState(false);

  const [selectedUser, setSelectedUser] = useState<{
    nokk: string;
    nama: string;
  } | null>(null);
  return (
    <div className="mt-20 font-mono w-full min-w-0">
      <div className="min-h-screen bg-[#F7FAFC] w-full">
        {/* HEADER */}
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-teal-600">
              Data Orang tua
            </h1>

            <p className="mt-1 text-base text-slate-600">
              Kelola seluruh data pengguna sistem
            </p>
          </div>

          {canCreate && (
            <Link
              href="/admin/dashboard/data-orang-tua/tambah-data"
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
                router.push("/admin/dashboard/data-orang-tua");
                return;
              }

              router.push(
                `/admin/dashboard/data-orang-tua?q=${encodeURIComponent(
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
          <div className="w-full overflow-x-auto">
            <table className="w-full min-w-[1200px]">
              <thead className="border-b border-slate-200 bg-slate-50">
                <tr>
                  <th className="px-6 py-5 text-center font-bold text-slate-700">
                    No
                  </th>
                  <th className="px-6 py-5 text-center font-bold text-slate-700">
                    No KK
                  </th>

                  <th className="px-6 py-5 text-center font-bold text-slate-700">
                    Nama ibu
                  </th>
                  <th className="px-6 py-5 text-center font-bold text-slate-700">
                    Nik Ibu
                  </th>

                  <th className="px-6 py-5 text-center font-bold text-slate-700">
                    Nama ayah
                  </th>
                  <th className="px-6 py-5 text-center font-bold text-slate-700">
                    Nik ayah
                  </th>

                  <th className="px-6 py-5 text-center font-bold text-slate-700">
                    Alamat
                  </th>
                  <th className="px-6 py-5 text-center font-bold text-slate-700">
                    RT
                  </th>
                  <th className="px-6 py-5 text-center font-bold text-slate-700">
                    RW
                  </th>

                  <th className="px-6 py-5 text-center font-bold text-slate-700">
                    No Telp
                  </th>

                  {showActionColumn && (
                    <th className="px-6 py-5 text-center font-bold text-slate-700">
                      Aksi
                    </th>
                  )}
                </tr>
              </thead>

              <tbody>
                {parents.map((parent, index) => (
                  <tr
                    key={parent.nokk}
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
                    {/* ID */}
                    <td className="px-6 py-6 text-center font-semibold text-slate-900">
                      {parent.nokk}
                    </td>

                    {/* NAMA IBU */}
                    <td className="px-6 py-6 text-center text-slate-900">
                      {parent.nama_ibu}
                    </td>

                    <td className="px-6 py-6 text-center  text-slate-900">
                      {parent.nik_ibu}
                    </td>

                    {/* NAMA AYAH */}
                    <td className="px-6 py-6 text-center text-slate-600">
                      {parent.nama_ayah}
                    </td>

                    <td className="px-6 py-6 text-center text-slate-600">
                      {parent.nik_ayah}
                    </td>

                    {/* ALAMAT */}
                    <td className="px-6 py-6 text-center text-slate-600">
                      {parent.alamat}
                    </td>
                    <td className="px-6 py-6 text-center text-slate-600">
                      {parent.rt}
                    </td>
                    <td className="px-6 py-6 text-center text-slate-600">
                      {parent.rw}
                    </td>

                    {/* NOTELP */}
                    <td className="px-6 py-6 text-center font-medium text-slate-700">
                      {parent.no_telp_hp}
                    </td>

                    {/* AKSI */}
                    {showActionColumn && (
                      <td className="px-6 py-6">
                        <div className="flex items-center justify-center gap-3">
                          {/* EDIT */}
                          {canUpdate && (
                            <Link
                              href={`/admin/dashboard/data-orang-tua/edit/${parent.nokk}`}
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
                              action={deleteOrangTua.bind(null, parent.nokk)}
                            >
                              <button
                                onClick={() => {
                                  setSelectedUser({
                                    nokk: parent.nokk,
                                    nama: parent.nokk,
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

                {parents.length === 0 && (
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

                router.push(
                  `/admin/dashboard/data-orang-tua?${params.toString()}`,
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
  );
}
