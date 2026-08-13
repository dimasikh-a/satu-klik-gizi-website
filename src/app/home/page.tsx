import FooterBanner from "@/features/landing/component/footer";
import Navbar from "@/features/landing/component/navbar";
import HomeSection from "@/features/landing/sections/Home-section";

export default function HomePage() {
  return (
    <>
      <Navbar></Navbar>
      <HomeSection></HomeSection>
      <FooterBanner></FooterBanner>
    </>
  );
}