"use client";
import {
  User
} from "lucide-react";
import { useRouter } from "next/navigation";

import { useActionState } from "react";
import { createUser } from "@/features/users/create-user";
import { useEffect } from "react";
import { toast } from "sonner";
import UserForm from "../component/use-form";

export default function DataUserForm() {
  const router = useRouter();
  const [state, formAction] = useActionState(createUser, null);
  useEffect(() => {
  if (state?.success) {
    toast.success(state.success);
  }

  if (state?.error) {
    toast.error(state.error);
  }
}, [state]);
  return (
    <section className="min-h-screen mt-20 w-full font-mono">
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
                <User size={25} className="text-white" />
              </div>
            </div>

            {/* TITLE */}
            <div>
              <h1 className="text-[20px] font-bold text-slate-900 leading-none">
                Data User
              </h1>

              <p className="mt-2 text-[16px] text-slate-500">
                Lengkapi informasi user pada form di bawah ini.
              </p>
            </div>
          </div>

          {/* LINE */}
          <div className="h-[1px] bg-gray-200 mt-2" />
        </div>

        {/* FORM */}
          <UserForm
      mode="create"
      action={formAction}
    />
      </div>
    </section>
  );
}
