
import DataMotherForm from "@/features/dashboard/sections/tambah-data-ibu";
import { authorize } from "@/lib/authorize";
import { PAGE, ACTION } from "@/lib/permission";

export default async function DashboardPage() {
  await authorize(
  PAGE.PARENT,
  ACTION.CREATE
);
  return (
<div className="min-h-screen bg-[#F7FAFC] flex">

      <DataMotherForm />

</div>
  );
}
