"use client";

import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Phone, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState,useEffect } from "react";

import nusamandiri from "../../../../public/logo universitas nusa mandiri.png";
import bima from "../../../../public/logo bima.png";
import kementrian from "../../../../public/Logo Kementerian Pendidikan Tinggi, Sains dan Teknologi-2.png";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
  setIsOpen(false);
}, [pathname]);

  const navLinks = [
    {
      name: "Home",
      href: "/home",
    },
    {
      name: "Layanan",
      href: "/layanan",
    },
    {
      name: "Agenda",
      href: "/agenda",
    },
    {
      name: "Statistik",
      href: "/statistik",
    },
  ];

  return (
    <nav className="w-full border-b fixed border-slate-200 z-50">
      {/* Top Navbar */}
      <div className="flex justify-between bg-teal-600 md:px-8 px-2 py-4 text-white">
        <div className="flex items-center gap-2">
          <CalendarDays size={18} />
          <p className="text-[10px] md:text-base">
            Senin - Jumat, 08.00 - 16.00 WIB
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Phone size={18} />
          <p className="text-[10px] md:text-base">
            Call center: (021)111111111
          </p>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="bg-white shadow-sm">
        {isOpen && (
          <div
            className="fixed inset-0 z-40 md:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
        <div className="flex items-center justify-between px-4 md:px-8 py-4">
          {/* Logo */}
          <div className="flex items-center gap-2 md:gap-3">
            <Image
              src={kementrian}
              alt="Kementrian"
              width={40}
              height={40}
              className="object-contain"
            />

            <Image
              src={bima}
              alt="Bima"
              width={60}
              height={60}
              className="object-contain"
            />

            <Image
              src={nusamandiri}
              alt="Nusa Mandiri"
              width={40}
              height={40}
              className="object-contain"
            />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link, index) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={index}
                  href={link.href}
                  className={`
                    relative pb-2 text-base font-medium transition-all duration-300
                    ${
                      isActive
                        ? "text-teal-600"
                        : "text-slate-700 hover:text-teal-600"
                    }
                  `}
                >
                  {link.name}

                  <span
                    className={`
                      absolute bottom-0 left-0 h-[2px] w-full rounded-full bg-teal-600 transition-all duration-300
                      ${isActive ? "scale-x-100" : "scale-x-0"}
                    `}
                  />
                </Link>
              );
            })}

            <Link
              href="/login"
              className="
                rounded-lg border-2 border-teal-600
                bg-teal-600 px-5 py-2
                text-base font-medium text-white
                transition-all duration-300
                hover:bg-white
                hover:text-teal-600
              "
            >
              Login
            </Link>
          </div>

          {/* Mobile Button */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
            {isOpen ? (
              <X size={28} className="text-slate-700" />
            ) : (
              <Menu size={28} className="text-slate-700" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
<div
  className={`
    relative z-50
    bg-white
    md:hidden overflow-hidden transition-all duration-300
    ${isOpen ? "max-h-[500px]" : "max-h-0"}
  `}
>
          <div className="border-t border-slate-200 px-4 py-4">
            <div className="flex flex-col gap-4">
              {navLinks.map((link, index) => {
                const isActive = pathname === link.href;

                return (
                  <Link
                    key={index}
                    href={link.href}
                    className={`
    py-2 text-base font-medium
    ${isActive ? "text-teal-600" : "text-slate-700"}
  `}
                  >
                    {link.name}
                  </Link>
                );
              })}

              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="
                  rounded-lg bg-teal-600 py-3 text-center
                  font-medium text-white
                "
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
