"use client";

import Link from "next/link";
import { Pencil, Search, Trash2, UserPlus } from "lucide-react";
import { deleteUser } from "@/features/users/delete-user";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
type User = {
  id_user: number;
  nama_user: string;
  alamat_user: string;
  no_telp_hp: string;
  status: string 
  jabatan: string
};

type Props = {
  users: User[];
  search: string;
  currentPage: number;
  totalPages: number;
};

export default function DataUserSection({
  users,
  search,
  currentPage,
  totalPages,
}: Props) {
  const page_size = 5;
  const [keyword, setKeyword] = useState(search ?? "");
  const router = useRouter();
  async function handleDelete() {
    if (!selectedUser) return;

    try {
      await deleteUser(selectedUser.id);

      toast.success("Data user berhasil dihapus");

      setOpenDelete(false);

      window.location.reload();
    } catch {
      toast.error("Gagal menghapus data user");
    }
  }
  const [openDelete, setOpenDelete] = useState(false);

  const [selectedUser, setSelectedUser] = useState<{
    id: number;
    nama: string;
  } | null>(null);
  return (
    <>
      <div className="mt-20 font-mono w-full min-w-0">
        <div className=" bg-[#F7FAFC] w-full">
          {/* HEADER */}
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-teal-600">
                Data User
              </h1>

              <p className="mt-1 text-base text-slate-600">
                Kelola seluruh data pengguna sistem
              </p>
            </div>

            <Link
              href="/admin/dashboard/data-user/tambah-data"
              className="flex items-center justify-center gap-3 bg-teal-600 hover:opacity-90 transition text-white font-semibold px-4 py-3 rounded-xl shadow-sm"
            >
              <UserPlus size={22} />
              <span>Tambah Data</span>
            </Link>
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
                  `/admin/dashboard/data-user?q=${encodeURIComponent(keyword)}`,
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
                      Nama User
                    </th>

                    <th className="px-6 py-5 text-center font-bold text-slate-700">
                      Alamat User
                    </th>

                    <th className="px-6 py-5 text-center font-bold text-slate-700">
                      No. Telepon
                    </th>

                    <th className="px-6 py-5 text-center font-bold text-slate-700">
                      Status
                    </th>

                    <th className="px-6 py-5 text-center font-bold text-slate-700">
                      Jabatan
                    </th>

                    <th className="px-6 py-5 text-center font-bold text-slate-700">
                      Aksi
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {users.map((user, index) => (
                    <tr
                      key={user.id_user}
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

                      {/* NAMA */}
                      <td className="px-6 py-6 text-center font-bold text-slate-900">
                        {user.nama_user}
                      </td>

                      {/* ALAMAT */}
                      <td className="px-6 py-6 text-center text-slate-600">
                        {user.alamat_user}
                      </td>

                      {/* TELEPON */}
                      <td className="px-6 py-6 text-center text-slate-600">
                        {user.no_telp_hp}
                      </td>

                      {/* STATUS */}
                      <td className="px-6 py-6 text-center">
                        <span
                          className={`
                          rounded-full
                          px-4
                          py-2
                          text-sm
                          font-bold

                          ${
                            user.status === "Ibu"
                              ? "bg-cyan-200 text-cyan-700"
                              : ""
                          }

                          ${
                            user.status === "Posyandu"
                              ? "bg-pink-100 text-pink-700"
                              : ""
                          }

                          ${
                            user.status === "Nakes"
                              ? "bg-orange-200 text-orange-400"
                              : ""
                          }
                        `}
                        >
                          {user.status}
                        </span>
                      </td>

                      {/* JABATAN */}
                      <td className="px-6 py-6 text-center font-medium text-slate-700">
                        {user.jabatan}
                      </td>

                      {/* AKSI */}
                      <td className="px-6 py-6">
                        <div className="flex items-center justify-center gap-3">
                          {/* EDIT */}
                          <Link
                            href={`/admin/dashboard/data-user/edit/${user.id_user}`}
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

                          {/* DELETE */}
                          <form action={deleteUser.bind(null, user.id_user)}>
                            <button
                              onClick={() => {
                                setSelectedUser({
                                  id: user.id_user,
                                  nama: user.nama_user,
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
                        </div>
                      </td>
                    </tr>
                  ))}

                  {users.length === 0 && (
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

      {openDelete && (
        <div
          className="
        fixed
        inset-0
        bg-black/40
        flex
        items-center
        justify-center
        z-50
      "
        >
          <div
            className="
          w-[420px]
          rounded-2xl
          bg-white
          p-6
          shadow-xl
        "
          >
            <h2
              className="
            text-xl
            font-bold
            text-slate-800
          "
            >
              Hapus Data User
            </h2>

            <p
              className="
            mt-4
            text-slate-600
          "
            >
              Yakin ingin menghapus
              <span
                className="
              font-semibold
              text-red-600
            "
              >
                {" "}
                {selectedUser?.nama}
              </span>
              ?
            </p>

            <div
              className="
            mt-8
            flex
            justify-end
            gap-3
          "
            >
              <button
                onClick={() => setOpenDelete(false)}
                className="
              px-5
              py-2
              rounded-lg
              border
            "
              >
                Batal
              </button>

              <button
                onClick={handleDelete}
                className="
              px-5
              py-2
              rounded-lg
              bg-red-500
              text-white
            "
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
