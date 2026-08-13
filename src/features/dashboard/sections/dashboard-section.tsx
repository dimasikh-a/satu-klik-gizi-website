"use client";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";

import { EllipsisVertical, CalendarDays, Check } from "lucide-react";

const statsData = [
  {
    title: "Total Balita",
    value: 120,
    description: "Tercatat di Wilayah",
    color: "border-l-[#FF8A65]",
  },
  {
    title: "Stunting",
    value: 10,
    description: "Mengalami Stunting",
    color: "border-l-[#F4D64E]",
  },
  {
    title: "Berat badan",
    value: 90,
    description: "BB Sesuai Umur",
    color: "border-l-[#4E7BEB]",
  },
  {
    title: "Wasting",
    value: 5,
    description: "Mengalami Wasting",
    color: "border-l-[#F5B458]",
  },
  {
    title: "Obesitas",
    value: 15,
    description: "Mengalami Obesitas",
    color: "border-l-[#9B74E4]",
  },
];

const chartData = [
  {
    name: "BB",
    value: 75,
    color: "#4E7BEB",
  },
  {
    name: "Obesitas",
    value: 12.5,
    color: "#9B74E4",
  },
  {
    name: "Wasting",
    value: 4.2,
    color: "#F5B458",
  },
  {
    name: "Stunting",
    value: 8.3,
    color: "#F4D64E",
  },
];

export default function DashboardSection() {
  return (
    <div className="mt-20">
      <div className="text-start">
        <p className="text-teal-600 font-semibold text-3xl">Data Status Gizi Balita</p>
{/* 
        <p className="text-slate-600 text-lg leading-6 max-w-3xl mx-auto mt-3">
          Berbagai layanan kesehatan terintegrasi untuk mendukung tumbuh kembang
          anak, kesehatan ibu, keluarga, dan masyarakat secara menyeluruh.
        </p> */}
      </div>
      <section className="grid grid-cols-12 gap-6 py-6 ">
        {/* LEFT */}
        <div className="col-span-5">
          <div className="grid grid-cols-2 gap-6">
            {statsData.map((item, index) => (
              <div
                key={index}
                className={`
                bg-white
                rounded-[28px]
                border
                border-gray-200
                border-l-[5px]
                ${item.color}
                px-2
                py-5
                shadow-sm
                flex
                flex-col
                items-center
                justify-center
                hover:shadow-md
                transition-all
                duration-300
              `}
              >
                {/* TOP */}
                <div className="flex items-center justify-center">
                  <div className="flex items-center justify-center gap-2">

                    {/* TITLE */}
                    <div>
                      <h3 className="text-[16px] font-semibold text-slate-800">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* VALUE */}
                <div className="mt-1">
                  <h1 className="text-xl leading-none font-bold text-slate-900 text-center">
                    {item.value}
                  </h1>

                  <p className="mt-2 text-sm text-slate-500 text-center">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div className="col-span-7">
          <div
            className="
            bg-white
            border
            border-gray-200
            rounded-[30px]
            shadow-sm
            px-6.5
            py-5
            h-full
          "
          >
            {/* HEADER */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-[20px] font-bold text-slate-800">
                  Distribusi Status Gizi Balita
                </h2>

                <p className="mt-2 text-[18px] text-slate-500">
                  Persentase status gizi berdasarkan hasil pemeriksaan terbaru
                </p>
              </div>
            </div>

            {/* CHART */}
            <div className="w-[478px] h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart
                  margin={{
                    right: 70,
                  }}
                >
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={130}
                    dataKey="value"
                    paddingAngle={0}
                    label={({ name, percent }) =>
                      `${name} ${((percent ?? 0) * 100).toFixed(1)}%`
                    }
                    labelLine={false}
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>

                  {/* CENTER TEXT */}
                  <text
                    x="43%"
                    y="46%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize={14}
                    fill="#64748b"
                  >
                    Total Balita
                  </text>

                  <text
                    x="43%"
                    y="54%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize={25}
                    fontWeight={700}
                    fill="#0f172a"
                  >
                    120
                  </text>

                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
