import DataBabyForm from "@/features/dashboard/sections/tambah-data-balita";
import Sidebar from "@/features/dashboard/component/sidebar";
import DashboardHeader from "@/features/dashboard/component/topbar";
import BottomBar from "@/features/dashboard/component/bottombar";
import { db } from "@/lib/db";
import { authorize } from "@/lib/authorize";
import { PAGE, ACTION } from "@/lib/permission";

export default async function DashboardPage() {
  const parents = await db.orang_tua.findMany({
    where: {
      is_active: true,
    },
    select: {
      nokk: true,
      nama_ibu: true,
    },
  });
  await authorize(
  PAGE.BALITA,
  ACTION.CREATE
);
  return (
    <div className=" bg-[#F7FAFC] flex">
      <DataBabyForm parents={parents} />
    </div>
  );
}
