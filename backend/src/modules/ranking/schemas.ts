import { z } from "zod";

export const listarRankingSchema = z
  .object({
    disciplinaId: z.string().uuid("Disciplina deve ser um UUID valido.").optional(),
  })
  .strict();

export const rankingSchemas = {
  listar: listarRankingSchema,
};
