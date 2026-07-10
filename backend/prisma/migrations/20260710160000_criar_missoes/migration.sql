-- CreateEnum
CREATE TYPE "dificuldade_missao" AS ENUM ('FACIL', 'MEDIA', 'DIFICIL');

-- CreateTable
CREATE TABLE "missoes" (
    "id" UUID NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "criterios_avaliacao" TEXT,
    "prazo" TIMESTAMP(3) NOT NULL,
    "pontuacao" INTEGER NOT NULL,
    "dificuldade" "dificuldade_missao" NOT NULL,
    "professor_id" UUID NOT NULL,
    "disciplina_id" UUID NOT NULL,
    "data_criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_atualizacao" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "missoes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "missoes_professor_id_idx" ON "missoes"("professor_id");

-- CreateIndex
CREATE INDEX "missoes_disciplina_id_idx" ON "missoes"("disciplina_id");

-- CreateIndex
CREATE INDEX "missoes_prazo_idx" ON "missoes"("prazo");

-- AddForeignKey
ALTER TABLE "missoes" ADD CONSTRAINT "missoes_professor_id_fkey" FOREIGN KEY ("professor_id") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "missoes" ADD CONSTRAINT "missoes_disciplina_id_fkey" FOREIGN KEY ("disciplina_id") REFERENCES "disciplinas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
