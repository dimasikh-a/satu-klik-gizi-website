"use client";

import Image from "next/image";
import nusamandiri from "../../../../public/logo universitas nusa mandiri.png";
import bima from "../../../../public/logo bima.png";
import { Lock, Phone, Eye, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function LupaPasswordSection() {
const kementrian = "/kementrian-logo.png";

  return (
    <>
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-cyan-50 via-white to-slate-100 px-4 pb-10 pt-[140px] font-mono md:px-4 md:pb-[50px] md:pt-[160px]">
        {/* Card */}
        {/* Card */}
        <div className="relative w-full max-w-[520px] overflow-hidden rounded-[32px] bg-white shadow-2xl">
          {/* Header */}
          <div className="relative overflow-hidden bg-gradient-to-r from-cyan-300 to-teal-200 px-4 pb-10 pt-6 text-center md:px-5 md:pb-14 md:pt-9">
            <div className="absolute -left-20 -top-20 h-52 w-52 rounded-full bg-white/20"></div>

            <div className="absolute -bottom-10 -right-10 h-44 w-44 rounded-full bg-white/10"></div>

            <h1 className="text-lg font-extrabold text-slate-900 md:text-2xl">
              Selamat datang di aplikasi Satu Klik Gizi
            </h1>

            <p className="mx-auto mt-2 max-w-2xl text-xs leading-relaxed text-slate-700 md:text-sm">
              Basis Informasi Pencegahan Demam Berdarah Dengue Kelurahan
              Pamulang Timur
            </p>
          </div>

          {/* Logo */}
          <div className="relative z-10 -mt-7 flex items-center justify-center gap-3 md:-mt-9 md:gap-5">
            {[kementrian, bima, nusamandiri].map((logo, index) => (
              <div
                key={index}
                className="flex h-14 w-14 items-center justify-center rounded-full border-4 border-white bg-white shadow-lg md:h-[72px] md:w-[72px]"
              >
                <Image
                  src={logo}
                  alt={`logo-${index}`}
                  className="h-8 w-8 object-contain md:h-10 md:w-10"
                />
              </div>
            ))}
          </div>

          {/* Form */}
          <div className="px-5 py-5 md:px-16">
            <div className="mb-5">
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-800 md:text-base">
                No.telp
              </label>

              <div className="group flex items-center rounded-xl border border-cyan-100 bg-slate-50 p-3 transition-all duration-300 focus-within:border-cyan-400 focus-within:bg-white focus-within:shadow-lg">
                <Phone className="mr-3 text-slate-400" size={18} />

                <input
                  type="text"
                  placeholder="Masukkan No.telp"
                  className="w-full bg-transparent text-sm text-black outline-none placeholder:text-slate-400 md:text-base"
                />
              </div>
            </div>

            <button className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 px-6 py-3 text-sm font-bold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-cyan-200">
              Kirim
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
