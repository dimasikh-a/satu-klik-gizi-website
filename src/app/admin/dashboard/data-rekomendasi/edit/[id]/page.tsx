import { notFound } from "next/navigation";

import { db } from "@/lib/db";
import { authorize } from "@/lib/authorize";
import { ACTION, PAGE } from "@/lib/permission";

import UpdateRekomendasi from "./update-rekomendasi";

import { serializePemeriksaan } from "@/features/pemeriksaan/serialize-pemeriksaan";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  await authorize(
    PAGE.PEMERIKSAAN,
    ACTION.UPDATE
  );

  const pemeriksaan =
  await db.pemeriksaan.findUnique({
    where: {
      idperiksa: Number(id),
    },

    include: {
      balita: {
        include: {
          orang_tua: {
            select: {
              nama_ayah: true,
              nama_ibu: true,
            },
          },
        },
      },

      rekomendasi: true,
    },
  });

  if (!pemeriksaan) {
    notFound();
  }

  return (
    <div className="p-6">
      <UpdateRekomendasi
        pemeriksaan={serializePemeriksaan(pemeriksaan)}
      />
    </div>
  );
}