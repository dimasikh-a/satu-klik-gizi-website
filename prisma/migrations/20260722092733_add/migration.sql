/*
  Warnings:

  - You are about to drop the column `lingkarkepala` on the `pemeriksaan` table. All the data in the column will be lost.
  - You are about to drop the column `lingkarlengan` on the `pemeriksaan` table. All the data in the column will be lost.
  - You are about to drop the column `lingkarpaha` on the `pemeriksaan` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "pemeriksaan" DROP COLUMN "lingkarkepala",
DROP COLUMN "lingkarlengan",
DROP COLUMN "lingkarpaha",
ADD COLUMN     "cara_pengukuran" TEXT;
