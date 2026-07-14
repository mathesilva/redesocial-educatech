-- CreateEnum
CREATE TYPE "status_resposta_missao" AS ENUM ('ENVIADA', 'AVALIADA');

-- CreateTable
CREATE TABLE "respostas_missao" (
    "id" UUID NOT NULL,
    "resposta" TEXT NOT NULL,
    "imagem_url" TEXT,
    "status" "status_resposta_missao" NOT NULL DEFAULT 'ENVIADA',
    "nota" DOUBLE PRECISION,
    "feedback_professor" TEXT,
    "data_envio" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_atualizacao" TIMESTAMP(3) NOT NULL,
    "aluno_id" UUID NOT NULL,
    "missao_id" UUID NOT NULL,

    CONSTRAINT "respostas_missao_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "respostas_missao_aluno_id_missao_id_key" ON "respostas_missao"("aluno_id", "missao_id");

-- CreateIndex
CREATE INDEX "respostas_missao_aluno_id_idx" ON "respostas_missao"("aluno_id");

-- CreateIndex
CREATE INDEX "respostas_missao_missao_id_idx" ON "respostas_missao"("missao_id");

-- CreateIndex
CREATE INDEX "respostas_missao_status_idx" ON "respostas_missao"("status");

-- AddForeignKey
ALTER TABLE "respostas_missao" ADD CONSTRAINT "respostas_missao_aluno_id_fkey" FOREIGN KEY ("aluno_id") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "respostas_missao" ADD CONSTRAINT "respostas_missao_missao_id_fkey" FOREIGN KEY ("missao_id") REFERENCES "missoes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
