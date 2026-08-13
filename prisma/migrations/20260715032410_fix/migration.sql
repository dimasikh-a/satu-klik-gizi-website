/*
  Warnings:

  - Made the column `alamat_user` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `jabatan` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "users" ALTER COLUMN "alamat_user" SET NOT NULL,
ALTER COLUMN "jabatan" SET NOT NULL;
