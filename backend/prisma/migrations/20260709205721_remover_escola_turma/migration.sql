/*
  Warnings:

  - You are about to drop the column `escola_id` on the `usuarios` table. All the data in the column will be lost.
  - You are about to drop the column `turma_id` on the `usuarios` table. All the data in the column will be lost.
  - You are about to drop the `escolas` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `turmas` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `escola` to the `usuarios` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "turmas" DROP CONSTRAINT "turmas_escola_id_fkey";

-- DropForeignKey
ALTER TABLE "usuarios" DROP CONSTRAINT "usuarios_escola_id_fkey";

-- DropForeignKey
ALTER TABLE "usuarios" DROP CONSTRAINT "usuarios_turma_id_fkey";

-- DropIndex
DROP INDEX "usuarios_escola_id_idx";

-- DropIndex
DROP INDEX "usuarios_turma_id_idx";

-- AlterTable
ALTER TABLE "usuarios" DROP COLUMN "escola_id",
DROP COLUMN "turma_id",
ADD COLUMN     "escola" TEXT NOT NULL,
ADD COLUMN     "turma" TEXT;

-- DropTable
DROP TABLE "escolas";

-- DropTable
DROP TABLE "turmas";

-- CreateIndex
CREATE INDEX "usuarios_escola_idx" ON "usuarios"("escola");

-- CreateIndex
CREATE INDEX "usuarios_turma_idx" ON "usuarios"("turma");
