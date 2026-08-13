import Navbar from "@/features/landing/component/navbar"
import FooterBanner from "@/features/landing/component/footer"
import StatistikSection from "@/features/landing/sections/statistik-section"
import { db } from "@/lib/db";


export default async function StatistikPage () {
const pemeriksaan = await db.pemeriksaan.findMany({
    where: {
      is_active: true,
      hasilgizi: {
        not: null,
      },
    },
    select: {
      idperiksa: true,
      idbalita: true,
      tglperiksa: true,
      hasilgizi: true,
    },
    orderBy: {
      tglperiksa: "desc",
    },
  });

  // Ambil pemeriksaan TERBARU untuk setiap balita
  const pemeriksaanTerbaru = new Map<number, (typeof pemeriksaan)[number]>();

  for (const item of pemeriksaan) {
    if (!pemeriksaanTerbaru.has(item.idbalita)) {
      pemeriksaanTerbaru.set(item.idbalita, item);
    }
  }

  const data = Array.from(pemeriksaanTerbaru.values());

  // Hitung berdasarkan hasilgizi
  const totalBalita = data.length;

  const giziBaik = data.filter(
    (item) => item.hasilgizi === "Gizi Baik"
  ).length;

  const giziKurang = data.filter(
    (item) => item.hasilgizi === "Gizi Kurang"
  ).length;

  const giziBuruk = data.filter(
    (item) => item.hasilgizi === "Gizi Buruk"
  ).length;

  const berisikoGiziLebih = data.filter(
    (item) => item.hasilgizi === "Berisiko Gizi Lebih"
  ).length;

  const giziLebih = data.filter(
    (item) => item.hasilgizi === "Gizi Lebih"
  ).length;

  const obesitas = data.filter(
    (item) => item.hasilgizi === "Obesitas"
  ).length;

    return (
        <>
        <Navbar></Navbar>
        <StatistikSection
              totalBalita={totalBalita}
      giziBaik={giziBaik}
      giziKurang={giziKurang}
      giziBuruk={giziBuruk}
      berisikoGiziLebih={berisikoGiziLebih}
      giziLebih={giziLebih}
      obesitas={obesitas}></StatistikSection>
        <FooterBanner></FooterBanner>
        </>
    )
}