-- CreateEnum
CREATE TYPE "tipo_reacao" AS ENUM ('CURTIDA');

-- AlterTable
ALTER TABLE "publicacoes" ADD COLUMN "quantidade_curtidas" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "reacoes" (
    "id" UUID NOT NULL,
    "usuario_id" UUID NOT NULL,
    "publicacao_id" UUID NOT NULL,
    "tipo" "tipo_reacao" NOT NULL DEFAULT 'CURTIDA',
    "data_criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "reacoes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "reacoes_usuario_id_publicacao_id_key" ON "reacoes"("usuario_id", "publicacao_id");

-- CreateIndex
CREATE INDEX "reacoes_usuario_id_idx" ON "reacoes"("usuario_id");

-- CreateIndex
CREATE INDEX "reacoes_publicacao_id_idx" ON "reacoes"("publicacao_id");

-- AddForeignKey
ALTER TABLE "reacoes" ADD CONSTRAINT "reacoes_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reacoes" ADD CONSTRAINT "reacoes_publicacao_id_fkey" FOREIGN KEY ("publicacao_id") REFERENCES "publicacoes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
