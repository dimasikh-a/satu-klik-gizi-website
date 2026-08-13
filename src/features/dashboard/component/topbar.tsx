import { User } from "lucide-react";

type Props = {
  nama: string;
  status: string;
};

export default function DashboardHeader({
  nama,
  status,
}: Props) {
  return (
    <header
      className="
        fixed
        top-0
        left-[258px]
        right-0
        z-50
        overflow-hidden
        rounded-b-[10px]
        bg-teal-600
        shadow-lg
      "
    >
      <div
        className="
          flex
          items-center
          justify-between
          px-12
          py-3
        "
      >
        {/* Left */}
        <div>
          <p className="text-lg font-medium text-white">
            Selamat Datang,
          </p>

          <h1 className="text-lg font-bold text-white">
            {nama}
          </h1>
        </div>

        {/* Right */}
        <div className="flex items-center gap-3 rounded-[10px] px-4 py-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15">
            <User size={24} className="text-white" />
          </div>

          <div>
            <h2 className="text-[15px] font-semibold leading-tight text-white">
              {nama}
            </h2>

            <p className="text-sm text-slate-200">
              {status}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}