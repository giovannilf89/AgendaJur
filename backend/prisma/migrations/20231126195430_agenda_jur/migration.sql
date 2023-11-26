/*
  Warnings:

  - You are about to alter the column `banner` on the `processos` table. The data in that column could be lost. The data in that column will be cast from `LongBlob` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `processos` MODIFY `banner` VARCHAR(191) NOT NULL;
