"use client";

import { HeartPulse } from "lucide-react";

export default function FooterBanner() {
  return (
    <footer className="w-full">
      <div className="bg-teal-600 px-8 py-6 shadow-lg">
        <div className="flex flex-col md:flex-row items-center justify-between gap-5">
          
          {/* LEFT */}
          <div className="flex items-center gap-4">
            <div className="w-13 h-13 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
              <HeartPulse className="text-white" size={30} />
            </div>

            <div>
              <h2 className="text-white text-base font-bold">
                Aplikasi Satu Klik Gizi
              </h2>

              <p className="text-white/90 text-sm md:text-base mt-0.5">
                Posyandu Gurame Kelurahan Pamulang Timur
              </p>
            </div>
          </div>

          {/* RIGHT */}
          <div className="text-center md:text-right">
            <p className="text-white text-sm md:text-base">
              oleh Tim Universitas Nusa Mandiri
            </p>

            <p className="text-white/80 italic text-sm mt-1">
              (Hibah Kemendiktisaintek Tahun Anggaran 2026)
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}