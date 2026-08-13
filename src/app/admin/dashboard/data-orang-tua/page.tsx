import DataMotherPage from "@/features/dashboard/sections/data-ibu-section";
import Sidebar from "@/features/dashboard/component/sidebar";
import DashboardHeader from "@/features/dashboard/component/topbar";
import BottomBar from "@/features/dashboard/component/bottombar";
import { getSession } from "@/lib/auth";
import { getParent } from "@/features/orang-tua/get-parent";
import { authorize } from "@/lib/authorize";
import { PAGE, ACTION } from "@/lib/permission";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
    page?: string;
  }>;
}) {
  const { q, page } = await searchParams;
  await authorize(PAGE.PARENT, ACTION.VIEW);

  const currentPage = Number(page) || 1;
  const { parent, totalPages } = await getParent(q, currentPage);
  const session = await getSession();

  return (
    <div className="min-h-screen bg-[#F7FAFC] flex">
      <DataMotherPage
        parents={parent}
        search={q ?? ""}
        currentPage={currentPage}
        totalPages={totalPages}
        status={session!.status}
      />
    </div>
  );
}
