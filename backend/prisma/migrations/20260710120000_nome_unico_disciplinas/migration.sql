-- DropIndex
DROP INDEX "disciplinas_nome_idx";

-- CreateIndex
CREATE UNIQUE INDEX "disciplinas_nome_key" ON "disciplinas"("nome");
