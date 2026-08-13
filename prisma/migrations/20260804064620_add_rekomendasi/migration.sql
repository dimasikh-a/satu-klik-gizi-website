/*
  Warnings:

  - You are about to drop the `rekomendasi` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "pemeriksaan" DROP CONSTRAINT "pemeriksaan_idrekomendasi_bb_fkey";

-- DropForeignKey
ALTER TABLE "pemeriksaan" DROP CONSTRAINT "pemeriksaan_idrekomendasi_tb_fkey";

-- AlterTable
ALTER TABLE "pemeriksaan" ADD COLUMN     "rekomendasi" TEXT;

-- DropTable
DROP TABLE "rekomendasi";
