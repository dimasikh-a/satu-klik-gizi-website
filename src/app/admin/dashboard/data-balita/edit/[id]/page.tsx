import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { authorize } from "@/lib/authorize";
import { PAGE, ACTION } from "@/lib/permission";
import UpdateBalita from "./update-balita";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const balita = await db.balita.findUnique({
    where: {
      idbalita: Number(id),
    },
  });

  if (!balita) {
    notFound();
  }

  const parents = await db.orang_tua.findMany({
    where: {
      is_active: true,
    },
    select: {
      nokk: true,
      nama_ibu: true,
    },
    orderBy: {
      nama_ibu: "asc",
    },
  });
  await authorize(PAGE.BALITA, ACTION.UPDATE);
  return (
    <div className="min-h-screen bg-[#F7FAFC] flex">
      <UpdateBalita
        balita={{
          ...balita,

          bblahir: balita.bblahir ?? null,
          tblahir: balita.tblahir ?? null,
        }}
        parents={parents}
      />
    </div>
  );
}
