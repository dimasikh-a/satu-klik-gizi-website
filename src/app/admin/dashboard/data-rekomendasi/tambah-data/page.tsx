
import RekomendasiForm from "@/features/dashboard/sections/tambah-data-rekomendasi";
import { authorize } from "@/lib/authorize";
import { PAGE, ACTION } from "@/lib/permission";

export default async function DashboardPage() {
  await authorize(
    PAGE.REKOMENDASI,
    ACTION.CREATE
  );
  return (

    <div className="min-h-screen bg-[#F7FAFC] flex">
      <RekomendasiForm />
    </div>
  );
}
