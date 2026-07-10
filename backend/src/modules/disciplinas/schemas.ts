import { z } from "zod";

export const cadastrarDisciplinaSchema = z
  .object({
    nome: z
      .string({ error: "Nome e obrigatorio." })
      .trim()
      .min(3, "Nome deve ter no minimo 3 caracteres.")
      .max(100, "Nome deve ter no maximo 100 caracteres."),
    descricao: z
      .string()
      .trim()
      .max(255, "Descricao deve ter no maximo 255 caracteres.")
      .optional(),
  })
  .strict();

export const listarDisciplinasSchema = z
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
  })
  .strict();

export const buscarDisciplinaPorIdSchema = z
  .object({
    id: z.string().uuid("Disciplina deve ser um UUID valido."),
  })
  .strict();

export const disciplinasSchemas = {
  buscarPorId: buscarDisciplinaPorIdSchema,
  cadastrar: cadastrarDisciplinaSchema,
  listar: listarDisciplinasSchema,
};
