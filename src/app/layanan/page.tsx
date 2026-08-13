import FooterBanner from "@/features/landing/component/footer";
import Navbar from "@/features/landing/component/navbar";
import LayananSection from "@/features/landing/sections/layanan-section";

export default function HomePage() {
  return (
    <>
      <Navbar></Navbar>
      <LayananSection></LayananSection>
      <FooterBanner></FooterBanner>
    </>
  );
}