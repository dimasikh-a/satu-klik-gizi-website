import Navbar from "@/features/landing/component/navbar";
import FooterBanner from "@/features/landing/component/footer";
import LoginSection from "@/features/landing/sections/login-section";

export default function LoginPage() {
  return (
    <>
      <Navbar />
      <LoginSection />
      <FooterBanner />
    </>
  );
}