export default function BottomBar() {
  return (
    <footer
      className="
    bg-teal-600
    text-white
    px-8
    py-5
    flex
    items-center
    justify-between
    mt-6
  "
    >
      {/* LEFT */}
      <div className="max-w-[80%]">
        <p className="text-[11px] leading-relaxed font-medium">
          Aplikasi Satu Klik Gizi Posyandu Gurame Kelurahan Pamulang Timur oleh
          Tim Universitas Nusa Mandiri
          <br />
          (Hibah Kemediktisaintek Tahun Anggaran 2026)
        </p>
      </div>

      {/* RIGHT */}
      <div>
        <p className="text-[13px] font-medium whitespace-nowrap">
          © 2025 Satu Klik Gizi. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
