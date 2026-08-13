/*
  Warnings:

  - Added the required column `umur_bulan` to the `pemeriksaan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pemeriksaan" ADD COLUMN     "umur_bulan" INTEGER NOT NULL;
