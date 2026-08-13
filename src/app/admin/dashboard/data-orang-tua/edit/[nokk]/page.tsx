import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { authorize } from "@/lib/authorize";
import { PAGE, ACTION } from "@/lib/permission";
import UpdateParents from "./update-parent";

export default async function Page({
  params,
}: {
  params: Promise<{ nokk: string }>;
}) {
  const { nokk } = await params;

  const parent = await db.orang_tua.findUnique({
    where: {
      nokk: String(nokk),
    },
  });

  console.log("PARENT:", parent);

  if (!parent) {
    notFound();
  }
await authorize(
  PAGE.PARENT,
  ACTION.UPDATE
);
  return (

        <div className="min-h-screen bg-[#F7FAFC] flex">
          <UpdateParents parent={parent}></UpdateParents>
        </div>
  );
}
