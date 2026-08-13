import { authorize } from "@/lib/authorize";
import { ACTION, PAGE } from "@/lib/permission";

import Laporan from "@/features/laporan/laporan";

export default async function Page() {
  return (
    <div className="p-6">
      <Laporan />
    </div>
  );
}