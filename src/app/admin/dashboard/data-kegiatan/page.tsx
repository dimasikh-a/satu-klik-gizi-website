import DataActivitySection from "@/features/dashboard/sections/data-kegiatan-section";
import { authorize } from "@/lib/authorize";
import { PAGE, ACTION } from "@/lib/permission";
import { getActivities } from "@/features/kegiatan/get-activity";
import { getSession } from "@/lib/auth";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
    page?: string;
  }>;
}) {
  const { q, page } = await searchParams;
  await authorize(PAGE.KEGIATAN, ACTION.VIEW);
  const session = await getSession();

  const currentPage = Number(page) || 1;
  const { kegiatan, totalPages } = await getActivities(q, currentPage);
  console.log(kegiatan[0]);
  return (
    <div className=" bg-[#F7FAFC] flex">
      <DataActivitySection
        kegiatans={kegiatan}
        search={q ?? ""}
        currentPage={currentPage}
        totalPages={totalPages}
        status={session!.status}
      />
    </div>
  );
}
