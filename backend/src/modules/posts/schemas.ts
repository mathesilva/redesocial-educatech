import { z } from "zod";

export const criarPublicacaoSchema = z
  .object({
    titulo: z
      .string({ error: "Titulo e obrigatorio." })
      .trim()
      .min(5, "Titulo deve ter no minimo 5 caracteres.")
      .max(150, "Titulo deve ter no maximo 150 caracteres."),
    descricao: z
      .string({ error: "Descricao e obrigatoria." })
      .trim()
      .min(10, "Descricao deve ter no minimo 10 caracteres."),
    imagemUrl: z.string().trim().url("Imagem deve ser uma URL valida.").optional(),
    disciplinaId: z.string({ error: "Disciplina e obrigatoria." }).uuid("Disciplina deve ser um UUID valido."),
  })
  .strict();

export const listarPublicacoesSchema = z
  .object({
    pagina: z.coerce
      .number()
      .int("Pagina deve ser um numero inteiro.")
      .min(1, "Pagina deve ser maior ou igual a 1.")
      .default(1),
    limite: z.coerce
      .number()
      .int("Limite deve ser um numero inteiro.")
      .min(1, "Limite deve ser maior ou igual a 1.")
      .default(10),
    disciplinaId: z.string().uuid("Disciplina deve ser um UUID valido.").optional(),
  })
  .strict();

export const buscarPublicacaoPorIdSchema = z
  .object({
    id: z.string().uuid("Publicacao deve ser um UUID valido."),
  })
  .strict();

export const postsSchemas = {
  buscarPorId: buscarPublicacaoPorIdSchema,
  criar: criarPublicacaoSchema,
  listar: listarPublicacoesSchema,
};
