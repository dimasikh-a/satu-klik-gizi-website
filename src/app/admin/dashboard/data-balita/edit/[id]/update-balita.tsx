"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { User as UserIcon } from "lucide-react";
import { toast } from "sonner";

import BalitaForm from "@/features/dashboard/component/form-balita";
import { updateBalita } from "@/features/balita/update-balita";

type Props = {
  balita: {
    idbalita: number;

    // Relasi
    id_orang_tua: number;
    nokk: string;

    // Identitas
    nik_anak: string | null;
    namaanak: string;
    jeniskelamin: string;
    tanggallahir: Date;

    // Data Kelahiran
    bblahir: number | null;
    tblahir: number | null;
    anakke: number | null;

    // Informasi Tambahan
    imd: boolean | null;
    buku_kia: boolean | null;

    // Status
    is_active: boolean;
  };

  parents: {
    nokk: string;
    nama_ibu: string;
  }[];
};

export default function UpdateBalita({
  balita,
  parents,
}: Props) {
  const router = useRouter();

  const updateAction = updateBalita.bind(
    null,
    balita.idbalita
  );

  const [state, formAction] = useActionState(
    updateAction,
    null
  );

  useEffect(() => {
    if (state?.success) {
      toast.success(state.success);

      setTimeout(() => {
        router.push("/admin/dashboard/data-balita");
      }, 1500);
    }

    if (state?.error) {
      toast.error(state.error);
    }
  }, [state, router]);

  return (
    <section className="min-h-screen mt-18 w-full bg-white font-mono">
      <div className="overflow-hidden rounded-[36px]">
        {/* Header */}
        <div className="px-6 pt-2 pb-4">
          <div className="flex items-center">
            <div className="flex h-20 w-20 items-center justify-center">
              <div className="flex h-13 w-13 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-teal-500">
                <UserIcon
                  size={25}
                  className="text-white"
                />
              </div>
            </div>

            <div>
              <h1 className="text-[20px] font-bold leading-none text-slate-900">
                Update Data Balita
              </h1>

              <p className="mt-2 text-[16px] text-slate-500">
                Perbarui informasi balita pada form di bawah
                ini.
              </p>
            </div>
          </div>

          <div className="mt-2 h-px bg-gray-200" />
        </div>

        {/* Form */}
        <BalitaForm
          mode="edit"
          balita={balita}
          parents={parents}
          action={formAction}
        />
      </div>
    </section>
  );
}