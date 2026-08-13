/*
  Warnings:

  - You are about to alter the column `bblahir` on the `balita` table. The data in that column could be lost. The data in that column will be cast from `Decimal(5,2)` to `Integer`.
  - You are about to alter the column `tblahir` on the `balita` table. The data in that column could be lost. The data in that column will be cast from `Decimal(5,2)` to `Integer`.

*/
-- AlterTable
ALTER TABLE "balita" ALTER COLUMN "bblahir" SET DATA TYPE INTEGER,
ALTER COLUMN "tblahir" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "pemeriksaan" ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true;
