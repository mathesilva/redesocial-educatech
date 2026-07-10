-- AlterTable
ALTER TABLE "publicacoes" ADD COLUMN "quantidade_comentarios" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "comentarios" (
    "id" UUID NOT NULL,
    "conteudo" TEXT NOT NULL,
    "usuario_id" UUID NOT NULL,
    "publicacao_id" UUID NOT NULL,
    "data_criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_atualizacao" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "comentarios_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "comentarios_usuario_id_idx" ON "comentarios"("usuario_id");

-- CreateIndex
CREATE INDEX "comentarios_publicacao_id_idx" ON "comentarios"("publicacao_id");

-- CreateIndex
CREATE INDEX "comentarios_data_criacao_idx" ON "comentarios"("data_criacao");

-- AddForeignKey
ALTER TABLE "comentarios" ADD CONSTRAINT "comentarios_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comentarios" ADD CONSTRAINT "comentarios_publicacao_id_fkey" FOREIGN KEY ("publicacao_id") REFERENCES "publicacoes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
