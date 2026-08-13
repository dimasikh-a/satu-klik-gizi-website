"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

import { Baby, CheckCircle, Cake, TriangleAlert, Activity } from "lucide-react";

const statistikData = {
  totalBalita: 120,
  normal: 90,
  stunting: 10,
  wasting: 5,
  obesitas: 15,
};

const chartData = [
  {
    name: "BB Sesuai Umur",
    value: statistikData.normal,
    color: "#4C7AE6",
  },
  {
    name: "Obesitas",
    value: statistikData.obesitas,
    color: "#9B7AE0",
  },
  {
    name: "Wasting",
    value: statistikData.wasting,
    color: "#E8B160",
  },
  {
    name: "Stunting",
    value: statistikData.stunting,
    color: "#F0D256",
  },
];

const statistikCards = [
  {
    title: "Total Balita",
    value: statistikData.totalBalita,
    subtitle: "Tercatat di Wilayah",
    bg: "bg-white",
    border: "border-black/20",
    iconBg: "bg-[#FFE9DE]",
    icon: <Baby size={34} className="text-[#FF9B73]" />,
  },
  {
    title: "Stunting",
    value: statistikData.stunting,
    subtitle: "Mengalami Stunting",
    bg: "bg-[#F4D657]",
    border: "border-[#E5C443]",
    iconBg: "bg-white",
    icon: <TriangleAlert size={34} className="text-[#F2B705]" />,
  },
  {
    title: "Total Balita",
    value: statistikData.normal,
    subtitle: "BB Sesuai Umur",
    bg: "bg-[#4C7AE6]",
    border: "border-[#315FD0]",
    iconBg: "bg-[#73E27D]",
    icon: <CheckCircle size={34} className="text-white" />,
    textWhite: true,
  },
  {
    title: "Wasting",
    value: statistikData.wasting,
    subtitle: "Mengalami Wasting",
    bg: "bg-[#E8B160]",
    border: "border-[#D59B46]",
    iconBg: "bg-white",
    icon: <Activity size={34} className="text-[#F58B00]" />,
  },
  {
    title: "Obesitas",
    value: statistikData.obesitas,
    subtitle: "Mengalami Obesitas",
    bg: "bg-[#9B7AE0]",
    border: "border-[#835FD1]",
    iconBg: "bg-white",
    icon: <Cake size={34} className="text-[#D76A2D]" />,
    textWhite: true,
  },
];

export default function StatistikSection() {
  return (
    <>
      <main className="relative overflow-hidden md:px-10 px-5 pb-25 md:pt-[190px] pt-[170px] bg-[#F7FAFC] font-mono">
        <div className="max-w-7xl mx-auto">
          {/* HEADER */}
          <div className="text-center">
            <h1 className="text-teal-600 font-semibold text-3xl">Statistik</h1>

            <p className="mx-auto max-w-3xl text-sm text-gray-600">
              Berikut Merupakan Kegiatan Posyandu Beberapa Hari Ke Depan:
            </p>
          </div>

          {/* CONTENT */}
          <div className="flex md:flex-row flex-col-reverse gap-5 items-center justify-center mt-1">
            {/* LEFT SIDE */}
            <div className="md:w-[80%] w-full">
              <div className="md:grid md:grid-cols-2 flex flex-wrap items-center justify-center gap-5">
                {statistikCards.map((item, index) => (
                  <div
                    key={index}
                    className={`${item.bg} border ${item.border} rounded-[28px] w-[200px] px-4 py-3 shadow-md hover:-translate-y-1 hover:shadow-xl transition-all duration-300`}
                  >
                    {/* TOP */}
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-11 h-11 rounded-full ${item.iconBg} flex items-center justify-center shadow-sm`}
                      >
                        {item.icon}
                      </div>

                      <div>
                        <h3
                          className={` text-base md:text-lg font-bold ${
                            item.textWhite ? "text-white" : "text-slate-900"
                          }`}
                        >
                          {item.title}
                        </h3>
                      </div>
                    </div>

                    {/* VALUE */}
                    <div className="mt-1 text-center">
                      <h2
                        className={`md:text-2xl text-xl font-black ${
                          item.textWhite ? "text-white" : "text-black"
                        }`}
                      >
                        {item.value}
                      </h2>

                      <p
                        className={`mt-1 text-base font-medium ${
                          item.textWhite ? "text-white/90" : "text-slate-800"
                        }`}
                      >
                        {item.subtitle}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT SIDE MOBILE*/}
            <div className="relative w-full md:h-[550px] h-[450px] hidden md:block">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart
                  margin={{
                    top: 40,
                    right: 80,
                    bottom: 40,
                    left: 80,
                  }}
                >
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={90}
                    outerRadius={130}
                    paddingAngle={0}
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name} ${(percent ?? 0).toFixed(1)}%`
                    }
                    labelLine={false}
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>

                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>

              {/* CENTER INFO */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[220px] h-[220px] rounded-full flex flex-col items-center justify-center text-center">
                  <p className="text-slate-500 text-lg font-medium">
                    Total Balita
                  </p>

                  <h2 className="text-6xl font-black text-slate-900 mt-2">
                    {statistikData.totalBalita}
                  </h2>
                </div>
              </div>
            </div>
            <div className="relative w-full h-[350px] md:h-[550px] block md:hidden">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart
                  margin={{
                    top: 20,
                    right: 20,
                    bottom: 20,
                    left: 20,
                  }}
                >
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={0}
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name} ${((percent ?? 0) * 100).toFixed(1)}%`
                    }
                    labelLine={false}
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>

                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>

              {/* CENTER INFO */}
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <div className="flex h-[140px] w-[140px] flex-col items-center justify-center rounded-full text-center md:h-[220px] md:w-[220px]">
                  <p className="text-xs font-medium text-slate-500 md:text-lg">
                    Total Balita
                  </p>

                  <h2 className="mt-1 text-3xl font-black text-slate-900 md:mt-2 md:text-6xl">
                    {statistikData.totalBalita}
                  </h2>
                </div>
              </div>
            </div>
          </div>

          {/* TABLE SECTION */}
          {/* <section className="mt-5">
            <div className="bg-white rounded-[32px] shadow-lg border border-slate-100 overflow-hidden">
              <div className="p-8 border-b border-slate-100">
                <h2 className="text-3xl font-black text-slate-900">
                  Statistik Detail Posyandu
                </h2>

                <p className="text-slate-500 text-lg mt-3">
                  Ringkasan kondisi kesehatan balita berdasarkan hasil
                  monitoring.
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="text-left px-8 py-5 text-slate-700 font-bold text-lg">
                        Kategori
                      </th>

                      <th className="text-left px-8 py-5 text-slate-700 font-bold text-lg">
                        Jumlah
                      </th>

                      <th className="text-left px-8 py-5 text-slate-700 font-bold text-lg">
                        Persentase
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {chartData.map((item, index) => {
                      const percentage = (
                        (item.value / statistikData.totalBalita) *
                        100
                      ).toFixed(1);

                      return (
                        <tr
                          key={index}
                          className="border-t border-slate-100 hover:bg-slate-50 transition"
                        >
                          <td className="px-8 py-6">
                            <div className="flex items-center gap-4">
                              <div
                                className="w-5 h-5 rounded-full"
                                style={{ backgroundColor: item.color }}
                              />

                              <span className="text-lg font-semibold text-slate-900">
                                {item.name}
                              </span>
                            </div>
                          </td>

                          <td className="px-8 py-6 text-lg font-bold text-slate-900">
                            {item.value}
                          </td>

                          <td className="px-8 py-6 text-lg text-slate-600">
                            {percentage}%
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </section> */}
        </div>
      </main>
    </>
  );
}
