/*
  Warnings:

  - You are about to alter the column `bblahir` on the `balita` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(5,2)`.
  - You are about to alter the column `tblahir` on the `balita` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(5,2)`.
  - A unique constraint covering the columns `[nik_anak]` on the table `balita` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `nokk` to the `balita` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "balita" ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "nokk" TEXT NOT NULL,
ALTER COLUMN "nik_anak" DROP NOT NULL,
ALTER COLUMN "tanggallahir" SET DATA TYPE DATE,
ALTER COLUMN "bblahir" SET DATA TYPE DECIMAL(5,2),
ALTER COLUMN "tblahir" SET DATA TYPE DECIMAL(5,2);

-- CreateIndex
CREATE UNIQUE INDEX "balita_nik_anak_key" ON "balita"("nik_anak");
