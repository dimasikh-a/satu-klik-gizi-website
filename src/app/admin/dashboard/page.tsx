
import DashboardSection from "@/features/dashboard/sections/dashboard-section";
import Sidebar from "@/features/dashboard/component/sidebar";
import DashboardHeader from "@/features/dashboard/component/topbar";
import BottomBar from "@/features/dashboard/component/bottombar";

export default function DashboardPage() {
  return (
<div className=" bg-[#F7FAFC] flex">
  {/* MAIN CONTENT */}
      <DashboardSection />
</div>
  );
}
