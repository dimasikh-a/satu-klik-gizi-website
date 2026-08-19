import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

import Sidebar from "@/features/dashboard/component/sidebar";
import DashboardHeader from "@/features/dashboard/component/topbar";
import BottomBar from "@/features/dashboard/component/bottombar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  return (
 <div className="flex min-h-screen bg-[#F7FAFC]">

  <aside className="fixed left-0 top-0 h-screen w-[260px] border-r bg-white z-50">
    <Sidebar status={session.status} />
  </aside>

  <main className="ml-[260px] flex flex-1 flex-col min-w-0">

    <DashboardHeader
      nama={session.nama}
      status={session.status}
    />

    <section className="p-6">
      {children}
    </section>

    <BottomBar />

  </main>

</div>
  );
}