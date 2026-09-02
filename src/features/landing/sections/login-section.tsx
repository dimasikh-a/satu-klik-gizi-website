"use client";
import { Lock, Phone, Eye, ArrowRight, EyeOff } from "lucide-react";
// 1. Tambahkan useEffect ke dalam import react
import { useState, useActionState, useEffect } from "react";
// 2. Tambahkan useRouter dari next/navigation
import { useRouter } from "next/navigation";
import Link from "next/link";
import { loginAction } from "../auth/form/login";
import Image from "next/image";
import nusamandiri from "../../../../public/logo universitas nusa mandiri.png";
import bima from "../../../../public/logo bima.png";

export default function LoginSection() {
  const [state, formAction, isPending] = useActionState(loginAction, null);
  const [showPassword, setShowPassword] = useState(false);
  const kementrian = "/kementrian-logo.png";
  return (
    <>
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-cyan-50 via-white to-slate-100 px-4 pt-[140px] pb-10 font-mono md:px-4 md:pt-[160px] md:pb-[50px]">
        {/* Card */}
        <div className="relative w-full max-w-md overflow-hidden rounded-[24px] bg-white shadow-2xl md:max-w-2xl md:rounded-[32px]">
          {/* Header */}
          <div className="relative overflow-hidden bg-gradient-to-r from-cyan-300 to-teal-200 px-4 pb-12 pt-5 text-center md:px-5 md:pb-14">
            <div className="absolute -left-20 -top-20 h-52 w-52 rounded-full bg-white/20"></div>
            <div className="absolute -bottom-10 -right-10 h-44 w-44 rounded-full bg-white/10"></div>

            <h1 className="text-lg font-extrabold text-slate-900 md:text-[22px]">
              Selamat Datang di Aplikasi Satu Klik Gizi
            </h1>

            <p className="mx-auto mt-2 max-w-xl text-xs leading-relaxed text-slate-700 md:text-sm">
              Basis Informasi Pencegahan Demam Berdarah Dengue Kelurahan
              Pamulang Timur
            </p>
          </div>

          {/* Logo */}
          <div className="relative z-10 -mt-8 flex items-center justify-center gap-3 md:-mt-11 md:gap-5">
            {[kementrian, bima, nusamandiri].map((logo, index) => (
              <div
                key={index}
                className="flex h-14 w-14 items-center justify-center rounded-full border-4 border-white bg-white shadow-lg md:h-18 md:w-18"
              >
                <Image
                  src={logo}
                  alt={`logo-${index}`}
                  width={40}
                  height={40}
                  className="h-8 w-8 object-contain md:h-10 md:w-10"
                />
              </div>
            ))}
          </div>

          {/* Form */}
          <form action={formAction} className="px-5 pb-6 pt-4 md:px-16">
            {state?.error && (
              <div className="mb-4 text-center text-sm font-medium text-red-500">
                {state.error}
              </div>
            )}

            {/* No Telp */}
            <div className="mb-4">
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-800 md:text-base">
                No. Telp
              </label>

              <div className="group flex items-center rounded-xl border border-cyan-100 bg-slate-50 p-3 transition-all duration-300 focus-within:border-cyan-400 focus-within:bg-white focus-within:shadow-lg">
                <Phone className="mr-3 text-slate-400" size={18} />

                <input
                  type="text"
                  name="notelp"
                  required
                  placeholder="No Telepon"
                  className="w-full bg-transparent text-sm text-black outline-none placeholder:text-slate-400 md:text-base"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-800 md:text-base">
                Password
              </label>

              <div className="group flex items-center rounded-xl border border-cyan-100 bg-slate-50 p-3 transition-all duration-300 focus-within:border-cyan-400 focus-within:bg-white focus-within:shadow-lg">
                <Lock className="mr-3 text-slate-400" size={18} />

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  placeholder="**********"
                  className="w-full bg-transparent text-sm text-black outline-none placeholder:text-slate-400 md:text-base"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff
                      size={20}
                      className="text-slate-400 hover:text-cyan-600"
                    />
                  ) : (
                    <Eye
                      size={20}
                      className="text-slate-400 hover:text-cyan-600"
                    />
                  )}
                </button>
              </div>
            </div>

            {/* Forgot Password */}
            <div className="mt-2">
              <Link
                href="/login/lupa_password"
                className="text-xs font-medium text-cyan-600 hover:underline md:text-[13px]"
              >
                Lupa Password?
              </Link>
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={isPending}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 px-6 py-3 text-sm font-bold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-75"
            >
              {isPending ? "Sign In..." : "Sign In"}
              <ArrowRight size={18} />
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
