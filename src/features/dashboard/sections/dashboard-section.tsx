"use client";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";


type Props = {
  totalBalita: number;
  giziBaik: number;
  giziKurang: number;
  giziBuruk: number;
  berisikoGiziLebih: number;
  giziLebih: number;
  obesitas: number;
};

export default function DashboardSection({
  totalBalita,
  giziBaik,
  giziKurang,
  giziBuruk,
  berisikoGiziLebih,
  giziLebih,
  obesitas,
}: Props) {
  /*
   * ============================================================
   * DATA STATISTIK
   * ============================================================
   */

  const statsData = [
    {
      title: "Total Balita",
      value: totalBalita,
      description: "Tercatat di Wilayah",
      color: "border-l-[#FF8A65]",
    },
    {
      title: "Gizi Baik",
      value: giziBaik,
      description: "Status Gizi Baik",
      color: "border-l-[#4E7BEB]",
    },
    {
      title: "Gizi Kurang",
      value: giziKurang,
      description: "Mengalami Gizi Kurang",
      color: "border-l-[#F5B458]",
    },
    {
      title: "Gizi Buruk",
      value: giziBuruk,
      description: "Mengalami Gizi Buruk",
      color: "border-l-[#FF8A65]",
    },
    {
      title: "Berisiko Gizi Lebih",
      value: berisikoGiziLebih,
      description: "Berisiko Gizi Lebih",
      color: "border-l-[#F4D64E]",
    },
    {
      title: "Gizi Lebih",
      value: giziLebih,
      description: "Mengalami Gizi Lebih",
      color: "border-l-[#E88B4A]",
    },
    {
      title: "Obesitas",
      value: obesitas,
      description: "Mengalami Obesitas",
      color: "border-l-[#9B74E4]",
    },
  ];

  /*
   * ============================================================
   * DATA CHART
   * ============================================================
   */

  const chartData = [
    {
      name: "Gizi Baik",
      value: giziBaik,
      color: "#4E7BEB",
    },
    {
      name: "Gizi Kurang",
      value: giziKurang,
      color: "#F5B458",
    },
    {
      name: "Gizi Buruk",
      value: giziBuruk,
      color: "#FF8A65",
    },
    {
      name: "Berisiko Gizi Lebih",
      value: berisikoGiziLebih,
      color: "#F4D64E",
    },
    {
      name: "Gizi Lebih",
      value: giziLebih,
      color: "#E88B4A",
    },
    {
      name: "Obesitas",
      value: obesitas,
      color: "#9B74E4",
    },
  ].filter((item) => item.value > 0);


  const totalStatusGizi =
    giziBuruk +
    giziKurang +
    giziBaik +
    berisikoGiziLebih +
    giziLebih +
    obesitas;

  return (
    <div className="mt-20 bg-white font-mono">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-teal-600">
          Data Status Gizi Balita
        </h1>
      </div>

      <section className="grid grid-cols-12 gap-6">
        <div className="col-span-5">
          <div className="grid grid-cols-2 gap-5">
            {statsData.map((item, index) => (
              <div
                key={index}
                className={`
                  flex
                  min-h-[140px]
                  flex-col
                  items-center
                  justify-center
                  rounded-[26px]
                  border
                  border-gray-200
                  border-l-[5px]
                  ${item.color}
                  bg-white
                  px-4
                  py-5
                  shadow-sm
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:shadow-md
                `}
              >
                {/* TITLE */}

                <h3 className="text-center text-[16px] font-semibold leading-tight text-slate-800">
                  {item.title}
                </h3>

                {/* VALUE */}

                <div className="mt-2 text-center">
                  <h2 className="text-2xl font-bold leading-none text-slate-900">
                    {item.value}
                  </h2>

                  <p className="mt-2 text-sm text-slate-500">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-7">
          <div
            className="
              flex
              h-full
              min-h-[500px]
              flex-col
              rounded-[30px]
              border
              border-gray-200
              bg-white
              px-7
              py-6
              shadow-sm
            "
          >
            {/* HEADER */}

            <div>
              <h2 className="text-[20px] font-bold text-slate-800">
                Distribusi Status Gizi Balita
              </h2>

              <p className="mt-2 text-[17px] leading-relaxed text-slate-500">
                Persentase status gizi berdasarkan hasil pemeriksaan terbaru
              </p>
            </div>

            {/* CHART */}

            <div className="flex flex-1 items-center justify-center">
              {chartData.length > 0 ? (
                <div className="h-[360px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={65}
                        outerRadius={125}
                        dataKey="value"
                        paddingAngle={1}
                        label={({ name, percent }) =>
                          `${name} ${((percent ?? 0) * 100).toFixed(1)}%`
                        }
                        labelLine={false}
                      >
                        {chartData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={entry.color}
                          />
                        ))}
                      </Pie>

                      {/* CENTER TEXT */}

                      <text
                        x="50%"
                        y="47%"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fontSize={14}
                        fill="#64748b"
                      >
                        Total
                      </text>

                      <text
                        x="50%"
                        y="55%"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fontSize={25}
                        fontWeight={700}
                        fill="#0f172a"
                      >
                        {totalStatusGizi}
                      </text>

                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="flex h-full items-center justify-center">
                  <p className="text-sm text-slate-500">
                    Belum ada data hasil gizi.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}