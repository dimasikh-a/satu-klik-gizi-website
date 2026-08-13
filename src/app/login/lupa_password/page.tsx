import Navbar from "@/features/landing/component/navbar";
import FooterBanner from "@/features/landing/component/footer";
import LupaPasswordSection from "@/features/landing/sections/lupa-password-section";

export default function AdminPage() {
  return (
    <>
      <Navbar />
      <LupaPasswordSection />
      <FooterBanner />
    </>
  );
}