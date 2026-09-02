// components/sidebar.tsx

"use client";
import unm from "../../../../public/logo universitas nusa mandiri.png";
import { logoutAction } from "@/features/landing/auth/form/logout";
import bima from "../../../../public/logo bima.png";
import Image from "next/image";
import Link from "next/link";
import { LogOut } from "lucide-react";
import { usePathname } from "next/navigation";
import { getPermission } from "@/lib/permission";

import {
  Home,
  Users,
  Baby,
  ClipboardList,
  Star,
  Stethoscope,
  FileText,
} from "lucide-react";

type Props = {
  status: string;
};

export default function Sidebar({ status }: Props) {
  const pathname = usePathname();
  const permission = getPermission(status);
  const menuItems = [
    {
      title: "Dashboard",
      icon: Home,
      href: "/admin/dashboard",
      show: permission.dashboard,
    },
    {
      title: "Data User",
      icon: Users,
      href: "/admin/dashboard/data-user",
      show: permission.user,
    },
    {
      title: "Data Orang Tua",
      icon: Users,
      href: "/admin/dashboard/data-orang-tua",
      show: permission.parent.view,
    },
    {
      title: "Data Balita",
      icon: Baby,
      href: "/admin/dashboard/data-balita",
      show: permission.balita.view,
    },
    {
      title: "Data Kegiatan",
      icon: ClipboardList,
      href: "/admin/dashboard/data-kegiatan",
      show: permission.kegiatan.view,
    },
    {
      title: "Data Rekomendasi",
      icon: Star,
      href: "/admin/dashboard/data-rekomendasi",
      show: permission.rekomendasi.view,
    },
    {
      title: "Data Pemeriksaan",
      icon: Stethoscope,
      href: "/admin/dashboard/data-pemeriksaan",
      show: permission.pemeriksaan.view,
    },
    {
      title: "Laporan",
      icon: FileText,
      href: "/admin/dashboard/laporan",
      show: permission.laporan.view,
    },
  ].filter((item) => item.show);
  return (
    <aside className="w-[260px] min-h-screen bg-white border-r border-gray-100 shadow-sm flex flex-col px-3 py-3 fixed">
      {/* Logo */}
      <div className="flex items-center justify-center gap-3">
        <Image
          src="/logo-kementerian.png"
          width={40}
          height={40}
          alt="logo"
          className="w-10 h-10 object-contain"
        />

        <Image src={bima} alt="logo" className="w-14 h-14 object-contain" />

        <Image src={unm} alt="logo" className="w-10 h-10 object-contain" />
      </div>

      {/* Brand */}
      <div className="mt-4 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          <span className="text-gray-900">Satu Klik</span>{" "}
          <span className="text-teal-600">Gizi</span>
        </h1>
      </div>

      {/* Divider */}
      <div className="w-full h-[1px] bg-gray-200 my-2" />

      {/* Menu */}
      <nav className="flex flex-col gap-1">
        {menuItems.map((item, index) => {
          const Icon = item.icon;

          const isActive = pathname === item.href;

          return (
            <Link
              key={index}
              href={item.href}
              className={`group flex items-center gap-2 px-5 py-2 rounded-[5px] transition-all duration-300 ${
                isActive
                  ? "bg-teal-600 shadow-lg"
                  : "hover:bg-gray-50 text-slate-700"
              }`}
            >
              {/* Icon Box */}
              <div
                className={`w-8 h-8 rounded-2xl flex items-center justify-center transition-all ${
                  isActive
                    ? "bg-white/20"
                    : "bg-slate-50 border border-slate-100"
                }`}
              >
                <Icon
                  size={20}
                  className={`${
                    isActive
                      ? "text-white"
                      : "text-slate-600 group-hover:text-teal-600"
                  }`}
                />
              </div>

              {/* Text */}
              <span className="text-base font-medium">{item.title}</span>
            </Link>
          );
        })}
      </nav>
      {/* Logout */}
      <div className="mt-auto border-t border-gray-200">
        <form action={logoutAction}>
          <button
            type="submit"
            className="
        w-full
        flex
        items-center
        gap-3
        px-5
        cursor-pointer
        py-3
        rounded-[5px]
        text-slate-700
        transition-all
        duration-300
      "
          >
            <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center">
              <LogOut size={18} />
            </div>

            <span className="font-medium">Logout</span>
          </button>
        </form>
      </div>
    </aside>
  );
}
