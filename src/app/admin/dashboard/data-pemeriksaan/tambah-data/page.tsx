
import DataPemeriksaanForm from "@/features/dashboard/sections/tambah-data-pemeriksaan";
import { db } from "@/lib/db";

export default async function DashboardPage() {
 const balitaDb = await db.balita.findMany({
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

const balita = balitaDb.map((item) => ({
  ...item,

  bblahir: item.bblahir
    ? Number(item.bblahir)
    : null,

  tblahir: item.tblahir
    ? Number(item.tblahir)
    : null,
}));
  return (
<div className=" bg-[#F7FAFC] flex">
      <DataPemeriksaanForm 
        mode="create"
  balita={balita}/>
</div>
  );
}
