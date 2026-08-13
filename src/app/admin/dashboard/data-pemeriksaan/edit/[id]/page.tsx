import { notFound } from "next/navigation";

import { db } from "@/lib/db";
import { authorize } from "@/lib/authorize";
import { PAGE, ACTION } from "@/lib/permission";
import { serializePemeriksaan } from "@/features/pemeriksaan/serialize-pemeriksaan";
import UpdatePemeriksaan from "./update-pemeriksaan";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  await authorize(PAGE.PEMERIKSAAN, ACTION.UPDATE);

  const [pemeriksaan, balita] = await Promise.all([
    db.pemeriksaan.findUnique({
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
      },
    }),

    db.balita.findMany({
      select: {
        idbalita: true,
        nik_anak: true,
        namaanak: true,
        jeniskelamin: true,
        tanggallahir: true,
        bblahir: true,
        tblahir: true,

        orang_tua: {
          select: {
            nama_ayah: true,
            nama_ibu: true,
          },
        },
      },
      orderBy: {
        namaanak: "asc",
      },
    }),
  ]);

  if (!pemeriksaan) {
    notFound();
  }
  const serializedPemeriksaan = serializePemeriksaan(pemeriksaan);

  return (
    <div className="p-6">
      <UpdatePemeriksaan pemeriksaan={serializedPemeriksaan} balita={balita} />
    </div>
  );
}
