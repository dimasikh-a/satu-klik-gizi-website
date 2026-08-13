"use client";

import { useRouter } from "next/navigation";
import { useActionState } from "react";
import { useEffect } from "react";
import { toast } from "sonner";
import { User as UserIcon } from "lucide-react";

import ParentForm from "@/features/dashboard/component/form-orang-tua";
import { updateParent } from "@/features/orang-tua/update-parent";

type Props = {
  parent: {
    nokk: string;
    namaibu: string;
    namaayah: string | null;
    alamat: string | null;
    notelp: string | null;
  };
};

export default function UpdateParents({ parent }: Props) {
  const router = useRouter();

  const updateAction = updateParent.bind(null, parent.nokk);

  const [state, formAction] = useActionState(updateAction, null);

  useEffect(() => {
    if (state?.success) {
      toast.success(state.success);

      setTimeout(() => {
        router.push("/admin/dashboard/data-orang-tua");
      }, 1500);
    }

    if (state?.error) {
      toast.error(state.error);
    }
  }, [state, router]);

  return (
    <section className="min-h-screen font-mono mt-18 bg-white">
      <div
        className="
          rounded-[36px]
          overflow-hidden
        "
      >
        {/* HEADER */}
        <div className="px-6 pt-2 pb-4">
          <div className="flex items-center">
            {/* ICON */}
            <div
              className="
                w-20
                h-20
                rounded-full
                flex
                items-center
                justify-center

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
                <UserIcon size={25} className="text-white" />
              </div>
            </div>

            {/* TITLE */}
            <div>
              <h1 className="text-[20px] font-bold text-slate-900 leading-none">
                Update Data User
              </h1>

              <p className="mt-2 text-[16px] text-slate-500">
                Update informasi user pada form di bawah ini.
              </p>
            </div>
          </div>

          {/* LINE */}
          <div className="h-[1px] bg-gray-200 mt-2" />
        </div>

        {/* FORM */}
        <ParentForm mode="edit" parent={parent} action={formAction} />
      </div>
    </section>
  );
}
