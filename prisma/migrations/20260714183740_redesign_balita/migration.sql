/*
  Warnings:

  - You are about to drop the column `is_active` on the `balita` table. All the data in the column will be lost.
  - You are about to drop the column `no_kia` on the `balita` table. All the data in the column will be lost.
  - Made the column `nik_anak` on table `balita` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "balita_no_kia_key";

-- AlterTable
ALTER TABLE "balita" DROP COLUMN "is_active",
DROP COLUMN "no_kia",
ALTER COLUMN "nik_anak" SET NOT NULL,
ALTER COLUMN "tanggallahir" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "bblahir" SET DATA TYPE DECIMAL(65,30),
ALTER COLUMN "tblahir" SET DATA TYPE DECIMAL(65,30);
