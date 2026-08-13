
import DataUserForm from "@/features/dashboard/sections/tambah-data-section";
import Sidebar from "@/features/dashboard/component/sidebar";
import DashboardHeader from "@/features/dashboard/component/topbar";
import BottomBar from "@/features/dashboard/component/bottombar";
import { authorize } from "@/lib/authorize";
import { PAGE, ACTION } from "@/lib/permission";

export default async function DashboardPage() {
  await authorize(
  PAGE.USER,
  ACTION.CREATE
);
  return (
<div className="min-h-screen bg-[#F7FAFC] flex">
      <DataUserForm />
</div>
  );
}
