-- AlterEnum
-- Postgres requires a new enum value to be committed before it can be used
-- as a column default or referenced in the same migration, so this is kept
-- as its own migration (see 20260715170200_registrar_inicio_missao).
ALTER TYPE "status_resposta_missao" ADD VALUE 'INICIADA' BEFORE 'ENVIADA';
