"use client";

import Link from "next/link";
import { Pencil, Search, Trash2, UserPlus } from "lucide-react";
import { deleteBalita } from "../../balita/delete-balita";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { getPermission } from "@/lib/permission";
import { balita } from "@prisma/client";
import { getBalita } from "@/features/balita/get-balita";

type Balita = Awaited<ReturnType<typeof getBalita>>["balitas"][number];

type Props = {
  balitas: Balita[];
  search: string;
  currentPage: number;
  totalPages: number;
  status: string;
};
export default function DataBabyPage({
  balitas,
  search,
  currentPage,
  totalPages,
  status,
}: Props) {
  const permission = getPermission(status);
  const [keyword, setKeyword] = useState(search ?? "");
  const router = useRouter();
  const page_size = 5
  const [openDelete, setOpenDelete] = useState(false);
  const canCreate = permission.balita.create;
  const canUpdate = permission.balita.update;
  const canDelete = permission.balita.delete;

  const showActionColumn = canUpdate || canDelete;
  const [selectedUser, setSelectedUser] = useState<{
    idbalita: number;
  } | null>(null);
  return (
    <div className="mt-20 font-mono w-full min-w-0">
      <div className="min-h-screen bg-[#F7FAFC] w-full">
        {/* HEADER */}
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-teal-600">
              Data Balita
            </h1>

            <p className="mt-1 text-base text-slate-600">
              Kelola seluruh data Balita
            </p>
          </div>
          {canCreate && (
            <Link
              href="/admin/dashboard/data-balita/tambah-data"
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
                router.push("/admin/dashboard/data-balita");
                return;
              }

              router.push(
                `/admin/dashboard/data-balita?q=${encodeURIComponent(keyword)}`,
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
                placeholder="Cari Balita..."
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
                    NIK Anak
                  </th>

                  <th className="px-6 py-5 text-center font-bold text-slate-700">
                    No KK
                  </th>

                  <th className="px-6 py-5 text-center font-bold text-slate-700">
                    Nama Anak
                  </th>

                  <th className="px-6 py-5 text-center font-bold text-slate-700">
                    Jenis Kelamin
                  </th>

                  <th className="px-6 py-5 text-center font-bold text-slate-700">
                    Tanggal Lahir
                  </th>

                  <th className="px-6 py-5 text-center font-bold text-slate-700">
                    BB Lahir
                  </th>
                  <th className="px-6 py-5 text-center font-bold text-slate-700">
                    TB Lahir
                  </th>
                  <th className="px-6 py-5 text-center font-bold text-slate-700">
                    Anak Ke
                  </th>
                  <th className="px-6 py-5 text-center font-bold text-slate-700">
                    IMD
                  </th>
                  <th className="px-6 py-5 text-center font-bold text-slate-700">
                    Memiliki Buku KIA/KMS
                  </th>
                  {showActionColumn && (
                    <th className="px-6 py-5 text-center font-bold text-slate-700">
                      Aksi
                    </th>
                  )}
                </tr>
              </thead>

              <tbody>
                {balitas.map((balita, index) => (
                  <tr
                    key={balita.idbalita}
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
                    {/* NIK ANAK */}
                    <td className="px-6 py-6 text-center font-semibold text-slate-900">
                      {balita.nik_anak ?? "-"}
                    </td>

                    {/* NO KK */}
                    <td className="px-6 py-6 text-center font-bold text-slate-900">
                      {balita.nokk}
                    </td>

                    {/* NAMA ANAK */}
                    <td className="px-6 py-6 text-center font-bold text-slate-900">
                      {balita.namaanak}
                    </td>

                    {/* JENIS KELAMIN */}
                    <td className="px-6 py-6 text-center">
                      <span
                        className={`
          rounded-full
          px-4
          py-2
          text-sm
          font-bold
          whitespace-nowrap

          ${
            balita.jeniskelamin === "Laki-laki"
              ? "bg-cyan-200 text-cyan-700"
              : "bg-pink-100 text-pink-700"
          }
        `}
                      >
                        {balita.jeniskelamin}
                      </span>
                    </td>

                    {/* TANGGAL LAHIR */}
                    <td className="px-6 py-6 text-center font-medium text-slate-700">
                      {new Intl.DateTimeFormat("id-ID", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      }).format(balita.tanggallahir)}
                    </td>

                    {/* BB LAHIR */}
                    <td className="px-6 py-6 text-center text-slate-600">
                      {balita.bblahir ? `${balita.bblahir} gram` : "-"}
                    </td>

                    {/* TB LAHIR */}
                    <td className="px-6 py-6 text-center font-medium text-slate-700">
                      {balita.tblahir ? `${balita.tblahir} cm` : "-"}
                    </td>

                    {/* anak ke */}
                    <td className="px-6 py-6 text-center font-bold text-slate-900">
                      {balita.anakke}
                    </td>

                    {/* IMD */}
                    <td className="px-6 py-6 text-center">
                      <span
                        className={`
      rounded-full
      px-4
      py-2
      text-sm
      font-bold

      ${
        balita.imd === true
          ? "bg-emerald-100 text-emerald-700"
          : balita.imd === false
            ? "bg-red-100 text-red-700"
            : "bg-slate-100 text-slate-600"
      }
    `}
                      >
                        {balita.imd === true
                          ? "Ya"
                          : balita.imd === false
                            ? "Tidak"
                            : "-"}
                      </span>
                    </td>

                    {/* Buku KIA */}
                    <td className="px-6 py-6 text-center">
                      <span
                        className={`
      rounded-full
      px-4
      py-2
      text-sm
      font-bold

      ${
        balita.buku_kia === true
          ? "bg-emerald-100 text-emerald-700"
          : balita.buku_kia === false
            ? "bg-red-100 text-red-700"
            : "bg-slate-100 text-slate-600"
      }
    `}
                      >
                        {balita.buku_kia === true
                          ? "Ya"
                          : balita.buku_kia === false
                            ? "Tidak"
                            : "-"}
                      </span>
                    </td>
                    {/* AKSI */}
                    {showActionColumn && (
                      <td className="px-6 py-6">
                        <div className="flex items-center justify-center gap-3">
                          {canUpdate && (
                            <Link
                              href={`/admin/dashboard/data-balita/edit/${balita.idbalita}`}
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

                          {canDelete && (
                            <form
                              action={deleteBalita.bind(null, balita.idbalita)}
                            >
                              <button
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

                {balitas.length === 0 && (
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
                  `/admin/dashboard/ddata-balita?${params.toString()}`,
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
