import DataRecommendationPage from "@/features/dashboard/sections/data-rekomendasi-section";
import { authorize } from "@/lib/authorize";
import { PAGE, ACTION } from "@/lib/permission";
import { getRecommendation } from "@/features/rekomendasi/get-recommendation";
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
await authorize(
  PAGE.REKOMENDASI,
  ACTION.CREATE
);
  const currentPage = Number(page) || 1;
  const { rekomendasi, totalPages } = await getRecommendation(q, currentPage);
  const session = await getSession();
  
  return (
    <div className="bg-[#F7FAFC] flex">
          <DataRecommendationPage
            rekomendasi={rekomendasi}
            search={q ?? ""}
            currentPage={currentPage}
            totalPages={totalPages}
            status={session!.status}

          />
 
    </div>
  );
}
