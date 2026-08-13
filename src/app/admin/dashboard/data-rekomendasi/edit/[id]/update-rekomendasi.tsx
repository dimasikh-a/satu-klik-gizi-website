"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ClipboardPlus } from "lucide-react";
import { toast } from "sonner";

import RekomendasiForm from "@/features/dashboard/component/form-rekomendasi";
import { createRekomendasi } from "@/features/rekomendasi/save-recommendation";

import type { PemeriksaanClient } from "@/features/pemeriksaan/types";

type Props = {
  pemeriksaan: PemeriksaanClient;
};

export default function DataRekomendasi({
  pemeriksaan,
}: Props) {
  const router = useRouter();

  /**
   * Bind id pemeriksaan
   */
  const saveAction = createRekomendasi.bind(
    null,
    pemeriksaan.idperiksa
  );

  const [state, formAction] = useActionState(
    saveAction,
    null
  );

  useEffect(() => {
    if (state?.success) {
      toast.success(state.success);

      setTimeout(() => {
        router.push(
          "/admin/dashboard/data-rekomendasi"
        );
      }, 1500);
    }

    if (state?.error) {
      toast.error(state.error);
    }
  }, [state, router]);

  return (
    <section className="mt-18 min-h-screen bg-white font-mono">
      <div className="overflow-hidden rounded-[36px]">
        {/* HEADER */}
        <div className="px-6 pt-2 pb-4">
          <div className="flex items-center">
            {/* ICON */}
            <div className="flex h-20 w-20 items-center justify-center rounded-full">
              <div className="flex h-13 w-13 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-teal-500">
                <ClipboardPlus
                  size={25}
                  className="text-white"
                />
              </div>
            </div>

            {/* TITLE */}
            <div>
              <h1 className="text-[20px] font-bold leading-none text-slate-900">
                Tambah Rekomendasi
              </h1>

              <p className="mt-2 text-[16px] text-slate-500">
                Lengkapi rekomendasi berdasarkan hasil
                pemeriksaan balita.
              </p>
            </div>
          </div>

          <div className="mt-2 h-[1px] bg-gray-200" />
        </div>

        {/* FORM */}
        <RekomendasiForm
          mode="create"
          pemeriksaan={pemeriksaan}
          action={formAction}
        />
      </div>
    </section>
  );
}