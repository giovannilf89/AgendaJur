/*
  Warnings:

  - The primary key for the `advogados` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `advogados` table. All the data in the column will be lost.
  - The required column `id_adv` was added to the `advogados` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE `processos` DROP FOREIGN KEY `processos_advogadoId_fkey`;

-- AlterTable
ALTER TABLE `advogados` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `id_adv` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id_adv`);

-- AddForeignKey
ALTER TABLE `processos` ADD CONSTRAINT `processos_advogadoId_fkey` FOREIGN KEY (`advogadoId`) REFERENCES `advogados`(`id_adv`) ON DELETE SET NULL ON UPDATE CASCADE;
