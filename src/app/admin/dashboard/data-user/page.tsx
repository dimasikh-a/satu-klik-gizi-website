import DataUserPage from "@/features/dashboard/sections/data-user-section";
import Sidebar from "@/features/dashboard/component/sidebar";
import DashboardHeader from "@/features/dashboard/component/topbar";
import BottomBar from "@/features/dashboard/component/bottombar";
import { getUsers } from "@/features/users/get-users";
import { authorize } from "@/lib/authorize";
import { PAGE, ACTION } from "@/lib/permission";
import {requirePKK} from "@/lib/auth-guard"

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
    page?: string;
  }>;
}) {
  // await requirePKK();
  const { q, page } = await searchParams;
  const currentPage = Number(page) || 1;
  const { users, totalPages } = await getUsers(q, currentPage);
    await authorize(
    PAGE.USER,
    ACTION.VIEW
  );
  return (
    <div className="min-h-screen bg-[#F7FAFC] flex ">
          <DataUserPage
            users={users}
            search={q ?? ""}
            currentPage={currentPage}
            totalPages={totalPages}
          />
    </div>
  );
}
