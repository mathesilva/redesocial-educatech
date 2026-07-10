-- CreateEnum
CREATE TYPE "status_publicacao" AS ENUM ('PENDENTE', 'APROVADA', 'REPROVADA');

-- CreateTable
CREATE TABLE "publicacoes" (
    "id" UUID NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "imagem_url" TEXT,
    "status" "status_publicacao" NOT NULL DEFAULT 'PENDENTE',
    "usuario_id" UUID NOT NULL,
    "disciplina_id" UUID NOT NULL,
    "data_criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_atualizacao" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "publicacoes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "publicacoes_usuario_id_idx" ON "publicacoes"("usuario_id");

-- CreateIndex
CREATE INDEX "publicacoes_disciplina_id_idx" ON "publicacoes"("disciplina_id");

-- CreateIndex
CREATE INDEX "publicacoes_status_idx" ON "publicacoes"("status");

-- CreateIndex
CREATE INDEX "publicacoes_data_criacao_idx" ON "publicacoes"("data_criacao");

-- AddForeignKey
ALTER TABLE "publicacoes" ADD CONSTRAINT "publicacoes_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "publicacoes" ADD CONSTRAINT "publicacoes_disciplina_id_fkey" FOREIGN KEY ("disciplina_id") REFERENCES "disciplinas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
