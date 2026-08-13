/*
  Warnings:

  - You are about to drop the column `idrekomendasi` on the `pemeriksaan` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "pemeriksaan" DROP CONSTRAINT "pemeriksaan_idrekomendasi_fkey";

-- AlterTable
ALTER TABLE "pemeriksaan" DROP COLUMN "idrekomendasi",
ADD COLUMN     "idrekomendasi_bb" INTEGER,
ADD COLUMN     "idrekomendasi_tb" INTEGER;

-- AlterTable
ALTER TABLE "rekomendasi" ALTER COLUMN "indikator" DROP DEFAULT;

-- AddForeignKey
ALTER TABLE "pemeriksaan" ADD CONSTRAINT "pemeriksaan_idrekomendasi_bb_fkey" FOREIGN KEY ("idrekomendasi_bb") REFERENCES "rekomendasi"("idrekomendasi") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pemeriksaan" ADD CONSTRAINT "pemeriksaan_idrekomendasi_tb_fkey" FOREIGN KEY ("idrekomendasi_tb") REFERENCES "rekomendasi"("idrekomendasi") ON DELETE SET NULL ON UPDATE CASCADE;
