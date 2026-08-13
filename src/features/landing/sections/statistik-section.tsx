"use client";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";

type StatusGizi =
  | "Gizi Buruk"
  | "Gizi Kurang"
  | "Gizi Baik"
  | "Berisiko Gizi Lebih"
  | "Gizi Lebih"
  | "Obesitas";

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

  /*
   * ============================================================
   * TOTAL STATUS GIZI
   * ============================================================
   */

  const totalStatusGizi =
    giziBuruk +
    giziKurang +
    giziBaik +
    berisikoGiziLebih +
    giziLebih +
    obesitas;

  return (
    <div className="mt-20 bg-white px-4 py-16 sm:px-6 sm:py-20 lg:mt-20 lg:px-5 lg:py-20">
      {/* ======================================================
          TITLE
      ====================================================== */}

      <div className="mb-6 text-center sm:mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-teal-600 sm:text-3xl">
          Data Status Gizi Balita
        </h1>
      </div>

      {/* ======================================================
          MAIN GRID
      ====================================================== */}

      <section
        className="
          grid
          grid-cols-1
          gap-5
          lg:grid-cols-12
          lg:gap-6
        "
      >
        {/* ====================================================
            LEFT - STATISTIK
        ==================================================== */}

        <div className="order-2 col-span-1 lg:order-1 lg:col-span-5">
          <div className="grid grid-cols-2 gap-4 sm:gap-5">
            {statsData.map((item, index) => (
              <div
                key={index}
                className={`
                  flex
                  min-h-[125px]
                  flex-col
                  items-center
                  justify-center
                  rounded-[22px]
                  border
                  border-gray-200
                  border-l-[5px]
                  ${item.color}
                  bg-white
                  px-2
                  py-4
                  shadow-sm
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:shadow-md

                  sm:min-h-[140px]
                  sm:rounded-[26px]
                  sm:px-4
                  sm:py-5
                `}
              >
                {/* TITLE */}

                <h3
                  className="
                    max-w-[140px]
                    text-center
                    text-[13px]
                    font-semibold
                    leading-tight
                    text-slate-800

                    sm:text-[16px]
                  "
                >
                  {item.title}
                </h3>

                {/* VALUE */}

                <div className="mt-2 text-center">
                  <h2
                    className="
                      text-xl
                      font-bold
                      leading-none
                      text-slate-900

                      sm:text-2xl
                    "
                  >
                    {item.value}
                  </h2>

                  <p
                    className="
                      mt-2
                      text-[11px]
                      leading-tight
                      text-slate-500

                      sm:text-sm
                    "
                  >
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ====================================================
            RIGHT - CHART
        ==================================================== */}

        <div className="order-1 col-span-1 lg:order-2 lg:col-span-7">
          <div
            className="
              flex
              min-h-[460px]
              flex-col
              rounded-[24px]
              border
              border-gray-200
              bg-white
              px-4
              py-5
              shadow-sm

              sm:min-h-[500px]
              sm:rounded-[30px]
              sm:px-7
              sm:py-6
            "
          >
            {/* HEADER */}

            <div>
              <h2
                className="
                  text-[18px]
                  font-bold
                  text-slate-800

                  sm:text-[20px]
                "
              >
                Distribusi Status Gizi Balita
              </h2>

              <p
                className="
                  mt-2
                  max-w-2xl
                  text-[14px]
                  leading-relaxed
                  text-slate-500

                  sm:text-[17px]
                "
              >
                Persentase status gizi berdasarkan hasil pemeriksaan terbaru
              </p>
            </div>

            {/* CHART */}

            <div className="flex flex-1 items-center justify-center">
              {chartData.length > 0 ? (
                <div
                  className="
                    h-[330px]
                    w-full

                    sm:h-[360px]
                  "
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={55}
                        outerRadius={105}
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
                        fontSize={13}
                        fill="#64748b"
                      >
                        Total
                      </text>

                      <text
                        x="50%"
                        y="55%"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fontSize={23}
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