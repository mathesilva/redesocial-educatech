import { z } from "zod";

export const publicacaoReacoesParamsSchema = z
  .object({
    publicacaoId: z.string().uuid("Publicacao deve ser um UUID valido."),
  })
  .strict();

export const reactionsSchemas = {
  publicacaoParams: publicacaoReacoesParamsSchema,
};
