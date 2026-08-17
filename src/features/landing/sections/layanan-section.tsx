"use client"

import Image from "next/image";
import {
  Baby,
  ShieldCheck,
  Users,
  HeartPulse,
  HandHeart,
  Salad,
} from "lucide-react";

import ibuHamil from "../../../../public/poster 1.png";
import balita from "../../../../public/poster 2.png";
import lansia from "../../../../public/poster 3.png";
import kb from "../../../../public/poster 4.png";
import imunisasi from "../../../../public/poster 5.png";
import gizi from "../../../../public/poster 6.png";


const layananData = [
  {
    title: "Program Kesehatan Ibu Hamil dan Menyusui",
    image: ibuHamil,
    icon: <HandHeart size={24} />,
  },
  {
    title: "Program Kesehatan Bayi dan Anak Balita",
    image: balita,
    icon: <Baby size={24} />,
  },
  {
    title: "Program Kesehatan Lansia",
    image: lansia,
    icon: <HeartPulse size={24} />,
  },
  {
    title: "Program Keluarga Berencana",
    image: kb,
    icon: <Users size={24} />,
  },
  {
    title: "Program Imunisasi",
    image: imunisasi,
    icon: <ShieldCheck size={24} />,
  },
  {
    title: "Program Pemantauan Gizi",
    image: gizi,
    icon: <Salad size={24} />,
  },
];

export default function LayananSection() {
  return (
    <>
    <section className="relative pb-25 md:pt-[190px] pt-[170px] bg-[#F7FAFC] overflow-hidden">
      {/* BACKGROUND DECORATION */}
      <div className="absolute left-0 top-10 opacity-30">
        <div className="grid grid-cols-5 gap-4">
          {Array.from({ length: 25 }).map((_, index) => (
            <div
              key={index}
              className="w-2 h-2 rounded-full bg-cyan-300"
            />
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 md:px-10">
        {/* HEADER */}
        <div className="text-center mb-10">

              <p className="text-teal-600 font-semibold text-3xl">
                Layanan Posyandu
              </p>

          <p className="text-slate-600 text-sm leading-6 max-w-3xl mx-auto mt-2">
            Berbagai layanan kesehatan terintegrasi untuk mendukung
            tumbuh kembang anak, kesehatan ibu, keluarga,
            dan masyarakat secara menyeluruh.
          </p>
        </div>

        {/* CARD GRID */}
        <div className="flex flex-wrap md:gap-10 gap-3">
          {layananData.map((item, index) => (
            <div
              key={index}
              className="group bg-white rounded-[28px] w-[48%] px-3 md:pt-2 md:pb-0 pt-2 pb-0 md:w-[30%]  shadow-md border border-slate-100 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
            >
              {/* IMAGE */}
              <div className="relative overflow-hidden rounded-2xl">
                <Image
                  src={item.image}
                  alt={item.title}
                  className="w-full h-[100px] lg:h-full object-cover group-hover:scale-105 transition duration-500"
                />
              </div>

              {/* CONTENT */}
              <div className="flex items-center justify-between gap-5 px-3 py-3">
                
                {/* LEFT */}
                <div className="flex flex-col md:flex-row items-center gap-4">
                  <div className="md:w-9 md:h-9 w-7 h-7 rounded-full bg-gradient-to-r from-teal-600 to-cyan-500 flex items-center justify-center text-white shadow-lg">
                    {item.icon}
                  </div>

                  <h3 className="text-[12px] md:text-lg font-bold text-slate-900 text-center md:text-left leading-snug max-w-[220px]">
                    {item.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
    </>
  );
}