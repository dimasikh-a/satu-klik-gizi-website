"use client";

import { useRouter } from "next/navigation";
import { useActionState } from "react";
import { useEffect } from "react";
import { toast } from "sonner";
import { User as UserIcon } from "lucide-react";

import UserForm from "@/features/dashboard/component/use-form";
import { updateUser } from "@/features/users/update-user";

type Props = {
  user: {
    id_user: number;
    nama_user: string;
    alamat_user: string;
    no_telp_hp: string;
    status: string;
    jabatan: string;
  };
};

export default function UpdateUser({ user }: Props) {
  const router = useRouter();

  const updateAction = updateUser.bind(null, user.id_user);

  const [state, formAction] = useActionState(updateAction, null);

  useEffect(() => {
    if (state?.success) {
      toast.success(state.success);

      setTimeout(() => {
        router.push("/admin/dashboard/data-user");
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
        <UserForm mode="edit" user={user} action={formAction} />
      </div>
    </section>
  );
}
