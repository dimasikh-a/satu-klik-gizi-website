/*
  Warnings:

  - You are about to drop the column `rekomendasi` on the `pemeriksaan` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "pemeriksaan" DROP COLUMN "rekomendasi";

-- CreateTable
CREATE TABLE "rekomendasi" (
    "idrekomendasi" SERIAL NOT NULL,
    "idperiksa" INTEGER NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "rekomendasi_pkey" PRIMARY KEY ("idrekomendasi")
);

-- CreateIndex
CREATE UNIQUE INDEX "rekomendasi_idperiksa_key" ON "rekomendasi"("idperiksa");

-- AddForeignKey
ALTER TABLE "rekomendasi" ADD CONSTRAINT "rekomendasi_idperiksa_fkey" FOREIGN KEY ("idperiksa") REFERENCES "pemeriksaan"("idperiksa") ON DELETE CASCADE ON UPDATE CASCADE;
