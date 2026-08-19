import DataBabyPage from "@/features/dashboard/sections/data-balita-section";
import { getBalita } from "@/features/balita/get-balita";
import { getSession } from "@/lib/auth";
import { authorize } from "@/lib/authorize";
import { ACTION, PAGE } from "@/lib/permission";
import { redirect } from "next/navigation";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
    page?: string;
  }>;
}) {
  const { q, page } = await searchParams;

  await authorize(
    PAGE.BALITA,
    ACTION.VIEW
  );

  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  const currentPage = Number(page ?? 1);

  const {
    balitas,
    totalPages,
  } = await getBalita(
    q,
    currentPage
  );

  return (
    <div className="flex bg-[#F7FAFC]">
      <DataBabyPage
        balitas={balitas}
        search={q ?? ""}
        currentPage={currentPage}
        totalPages={totalPages}
        status={session.status}
      />
    </div>
  );
}