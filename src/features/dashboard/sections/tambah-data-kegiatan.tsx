"use client";
import { User, ClipboardList } from "lucide-react";
import { useRouter } from "next/navigation";

import { useActionState } from "react";
import { createActivity } from "@/features/kegiatan/create-activity";
import { useEffect } from "react";
import { toast } from "sonner";
import KegiatanForm from "../component/form-kegiatan";

export default function DataKegiatanForm() {
  const router = useRouter();
  const [state, formAction] = useActionState(createActivity, null);
  useEffect(() => {
    if (state?.success) {
      toast.success(state.success);
    }

    if (state?.error) {
      toast.error(state.error);
    }
  }, [state]);

  return (
    <section className="min-h-screen w-full bg-[#f5f7fb] mt-20">
      <div
        className="
          rounded-[36px]
          overflow-hidden
        "
      >
        {/* HEADER */}
        <div className="px-6 pt-2 pb-4">
          <div className="flex items-center gap-6">
            {/* ICON */}
            <div
              className="
                w-13
                h-13
                rounded-full
                border
                border-gray-200
                flex
                items-center
                justify-center
                bg-white
              "
            >
              <div
                className="
                  w-13
                  h-13
                  rounded-full
                  bg-gradient-to-br
                  from-cyan-500
                  to-teal-500
                  flex
                  items-center
                  justify-center
                "
              >
                <ClipboardList size={30} className="text-white" />
              </div>
            </div>

            {/* TITLE */}
            <div>
              <h1 className="text-[20px] font-bold text-slate-900 leading-none">
                Data Kegiatan
              </h1>

              <p className="mt-2 text-[16px] text-slate-500">
                Lengkapi informasi kegiatan pada form di bawah ini.
              </p>
            </div>
          </div>

          {/* LINE */}
          <div className="h-[1px] bg-gray-200 mt-3.5" />
        </div>

        {/* FORM */}
        <KegiatanForm mode="create" action={formAction} />
      </div>
    </section>
  );
}
