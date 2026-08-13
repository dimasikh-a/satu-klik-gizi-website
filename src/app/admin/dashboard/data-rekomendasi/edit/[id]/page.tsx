import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { authorize } from "@/lib/authorize";
import { PAGE, ACTION } from "@/lib/permission";
import UpdateRekomendasi from "./update-rekomendasi";

export default async function Page({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;

  const rekomendasi = await db.rekomendasi.findUnique({
    where: {
      idrekomendasi: Number(id),
    },
  });

  if (!rekomendasi) {
    notFound();
  }
  await authorize(
    PAGE.REKOMENDASI,
    ACTION.UPDATE
  );

  return (
        <div className="min-h-screen bg-[#F7FAFC] flex">
          <UpdateRekomendasi rekomendasi={rekomendasi} />
        </div>
  );
}
