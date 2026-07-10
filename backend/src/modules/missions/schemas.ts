import { z } from "zod";

const dificuldadeMissaoSchema = z.enum(["FACIL", "MEDIA", "DIFICIL"]);

export const criarMissaoSchema = z
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
    criteriosAvaliacao: z.string().trim().optional(),
    prazo: z.coerce.date({ error: "Prazo e obrigatorio." }),
    pontuacao: z.coerce
      .number({ error: "Pontuacao e obrigatoria." })
      .int("Pontuacao deve ser um numero inteiro.")
      .positive("Pontuacao deve ser maior que zero."),
    dificuldade: dificuldadeMissaoSchema,
    disciplinaId: z.string({ error: "Disciplina e obrigatoria." }).uuid("Disciplina deve ser um UUID valido."),
  })
  .strict();

export const listarMissoesSchema = z
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

export const buscarMissaoPorIdSchema = z
  .object({
    id: z.string().uuid("Missao deve ser um UUID valido."),
  })
  .strict();

export const missionsSchemas = {
  buscarPorId: buscarMissaoPorIdSchema,
  criar: criarMissaoSchema,
  listar: listarMissoesSchema,
};
