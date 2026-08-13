import DataPemeriksaanPage from "@/features/dashboard/sections/data-pemeriksaan-section";
import { getPemeriksaan } from "@/features/pemeriksaan/get-pemeriksaan";
import { authorize } from "@/lib/authorize";
import { PAGE, ACTION } from "@/lib/permission";
import { getSession } from "@/lib/auth";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
    page?: string;
  }>;
}) {
  await authorize(PAGE.PEMERIKSAAN, ACTION.VIEW);

const { q, page } = await searchParams;
const currentPage = Number(page) || 1;

const { pemeriksaan, totalPages } =
  await getPemeriksaan(q, currentPage);

const session = await getSession();

  return (
    <div className="min-h-screen bg-[#F7FAFC] flex ">
      <DataPemeriksaanPage
        pemeriksa={pemeriksaan}
        search={q ?? ""}
        currentPage={currentPage}
        totalPages={totalPages}
        status={session!.status}
      />
    </div>
  );
}
