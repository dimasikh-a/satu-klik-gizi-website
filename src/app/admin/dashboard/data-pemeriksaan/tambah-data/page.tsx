import DataPemeriksaanForm from "@/features/dashboard/sections/tambah-data-pemeriksaan";
import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";


type BalitaForm = Prisma.balitaGetPayload<{
  include: {
    orang_tua: {
      select: {
        nama_ayah: true;
        nama_ibu: true;
      };
    };
  };
}>;


export default async function DashboardPage() {

  const balitaDb =
    await db.balita.findMany({
      where: {
        is_active: true,
      },

      include: {
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
    });


  const balita = balitaDb.map(
    (item: BalitaForm) => ({
      ...item,

      bblahir:
        item.bblahir !== null
          ? Number(item.bblahir)
          : null,

      tblahir:
        item.tblahir !== null
          ? Number(item.tblahir)
          : null,
    })
  );


  return (
    <div className="flex bg-[#F7FAFC]">
      <DataPemeriksaanForm
        mode="create"
        balita={balita}
      />
    </div>
  );
}