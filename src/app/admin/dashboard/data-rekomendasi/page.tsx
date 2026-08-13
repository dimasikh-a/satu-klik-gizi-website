import DataRecommendationPage from "@/features/dashboard/sections/data-rekomendasi-section";
import { getRecommendation } from "@/features/rekomendasi/get-recommendation";

import { getSession } from "@/lib/auth";
import { authorize } from "@/lib/authorize";
import { ACTION, PAGE } from "@/lib/permission";

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

  const [{ rekomendasi, totalPages }, session] =
    await Promise.all([
      getRecommendation(q, currentPage),
      getSession(),
    ]);

  return (
    <div className="flex bg-[#F7FAFC]">
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