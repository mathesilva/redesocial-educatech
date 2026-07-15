-- AlterTable
ALTER TABLE "notificacoes" ADD COLUMN     "missao_id" UUID;

-- CreateIndex
CREATE INDEX "notificacoes_missao_id_idx" ON "notificacoes"("missao_id");

-- AddForeignKey
ALTER TABLE "notificacoes" ADD CONSTRAINT "notificacoes_missao_id_fkey" FOREIGN KEY ("missao_id") REFERENCES "missoes"("id") ON DELETE SET NULL ON UPDATE CASCADE;
