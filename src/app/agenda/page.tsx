import FooterBanner from "@/features/landing/component/footer";
import Navbar from "@/features/landing/component/navbar";
import AgendaSection from "@/features/landing/sections/agenda-section";
import { getAgenda } from "@/features/landing/get-agenda";

export const dynamic = "force-dynamic";

export default async function AgendaPage() {
  const agendas = await getAgenda();

  return (
    <>
      <Navbar />
      <AgendaSection agenda={agendas} />
      <FooterBanner />
    </>
  );
}