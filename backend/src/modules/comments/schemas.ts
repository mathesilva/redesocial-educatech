import { z } from "zod";

export const criarComentarioSchema = z
  .object({
    conteudo: z
      .string({ error: "Conteudo e obrigatorio." })
      .trim()
      .min(2, "Conteudo deve ter no minimo 2 caracteres.")
      .max(500, "Conteudo deve ter no maximo 500 caracteres."),
  })
  .strict();

export const publicacaoComentariosParamsSchema = z
  .object({
    publicacaoId: z.string().uuid("Publicacao deve ser um UUID valido."),
  })
  .strict();

export const commentsSchemas = {
  criar: criarComentarioSchema,
  publicacaoParams: publicacaoComentariosParamsSchema,
};
