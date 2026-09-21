/*
  Warnings:

  - Added the required column `sorting` to the `generals` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sorting` to the `messages` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "generals" ADD COLUMN     "sorting" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "messages" ADD COLUMN     "sorting" INTEGER NOT NULL;
