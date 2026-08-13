import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import Sidebar from "@/features/dashboard/component/sidebar";
import DashboardHeader from "@/features/dashboard/component/topbar";
import BottomBar from "@/features/dashboard/component/bottombar";
import { authorize } from "@/lib/authorize";
import { PAGE, ACTION } from "@/lib/permission";
import UpdateUser from "./update-user";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  await authorize(PAGE.USER, ACTION.UPDATE);
  const user = await db.users.findUnique({
    where: {
      id_user: Number(id),
    },
  });

  if (!user) {
    notFound();
  }

  return (
    <div className="p-6">
      <UpdateUser user={user} />
    </div>
  );
}
