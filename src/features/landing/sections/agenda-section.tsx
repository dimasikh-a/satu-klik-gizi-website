"use client"


import Image from "next/image";
import {kegiatan} from "@prisma/client"

type AgendaCardProps = {
  agenda : kegiatan[]
}
export default function AgendaSection({
  agenda,
}: AgendaCardProps) {
  return (
    <>
      <section className="relative overflow-hidden pb-25 md:pt-[190px] pt-[170px] bg-[#F7FAFC]">

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

          {/* Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {agenda.map((agenda, index) => (
              <div
                key={index}
                className="group bg-white rounded-[28px] px-3 py-2 shadow-md border border-slate-100 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
              >
                {/* Image */}
                <div className="relative overflow-hidden rounded-[15px]">
                  <Image
                    src={agenda.foto ?? "/agenda-default.jpg"}
                    alt={agenda.judul_kegiatan}
                    width={500}
                    height={300}
                    className="w-full h-[150px] object-cover group-hover:scale-105 transition duration-500 rounded15pxpx]"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>

                {/* Content */}
                <div className="p-3.5">
                  <h2 className="mb-2 text-xl text-center font-bold text-teal-600">
                    {agenda.judul_kegiatan}
                  </h2>

                  <p className="mb-4 leading-relaxed text-sm text-center text-gray-600">
                    {agenda.keterangan}
                  </p>

                  {/* Divider */}
                  <div className="mb-3 h-[1px] w-full bg-gray-200"></div>

                  {/* Date */}
                  <div className="flex items-center justify-center">
                    <div className="inline-flex items-center gap-3 rounded-[10px] bg-teal-600 md:px-5 md:py-3 px-4 py-2 text-sm font-semibold text-white shadow-md">
                      <span>📅</span>
                      <span>
                        {" "}
                        {new Intl.DateTimeFormat("id-ID", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        }).format(agenda.tanggal_pelaksanaan)}
                      </span>
                    </div>
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
