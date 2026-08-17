"use client";

import Image from "next/image";
import { kegiatan } from "@prisma/client";

type AgendaCardProps = {
  agenda: kegiatan[];
};

export default function AgendaSection({
  agenda,
}: AgendaCardProps) {
  return (
    <>
      <section className="relative overflow-hidden pb-25 md:pt-[190px] pt-[170px] bg-[#F7FAFC] md:h-[900px]">
        <div className="mx-auto max-w-7xl px-6">
          {/* Heading */}
          <div className="mb-14 text-center">
            <div className="mb-2 flex items-center justify-center gap-4">
              <p className="text-teal-600 font-semibold text-3xl">
                Agenda Posyandu
              </p>
            </div>

            <p className="mx-auto max-w-3xl text-sm text-gray-600">
              Berikut merupakan kegiatan Posyandu beberapa hari ke depan untuk
              mendukung kesehatan ibu, anak, dan masyarakat.
            </p>
          </div>

          {/* Content */}
          {agenda.length === 0 ? (
            /* Empty State */
            <div className="flex justify-center">
              <div className="w-full max-w-2xl rounded-[28px] border border-slate-100 bg-white px-6 py-14 text-center shadow-md">
                
                <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-teal-50">
                  <span className="text-4xl">📅</span>
                </div>

                <h2 className="mb-2 text-2xl font-bold text-teal-600">
                  Belum Ada Agenda
                </h2>

                <p className="mx-auto max-w-md text-sm leading-relaxed text-gray-500">
                  Saat ini belum ada kegiatan Posyandu yang dijadwalkan.
                  Silakan cek kembali beberapa waktu ke depan untuk melihat
                  agenda terbaru.
                </p>
              </div>
            </div>
          ) : (
            /* Cards */
            <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
              {agenda.map((item, index) => (
                <div
                  key={index}
                  className="group rounded-[28px] border border-slate-100 bg-white px-3 py-2 shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                >
                  {/* Image */}
                  <div className="relative overflow-hidden rounded-[15px]">
                    <Image
                      src={item.foto ?? "/agenda-default.jpg"}
                      alt={item.judul_kegiatan}
                      width={500}
                      height={300}
                      className="h-[150px] w-full rounded-[15px] object-cover transition duration-500 group-hover:scale-105"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="p-3.5">
                    <h2 className="mb-2 text-center text-xl font-bold text-teal-600">
                      {item.judul_kegiatan}
                    </h2>

                    <p className="mb-4 text-center text-sm leading-relaxed text-gray-600">
                      {item.keterangan}
                    </p>

                    {/* Divider */}
                    <div className="mb-3 h-[1px] w-full bg-gray-200" />

                    {/* Date */}
                    <div className="flex items-center justify-center">
                      <div className="inline-flex items-center gap-3 rounded-[10px] bg-teal-600 px-4 py-2 text-sm font-semibold text-white shadow-md md:px-5 md:py-3">
                        <span>📅</span>

                        <span>
                          {new Intl.DateTimeFormat("id-ID", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          }).format(item.tanggal_pelaksanaan)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}