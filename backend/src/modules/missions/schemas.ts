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

export const buscarRespostaMissaoParamsSchema = z
  .object({
    missaoId: z.string().uuid("Missao deve ser um UUID valido."),
  })
  .strict();

export const avaliarRespostaMissaoParamsSchema = z
  .object({
    missaoId: z.string().uuid("Missao deve ser um UUID valido."),
    respostaId: z.string().uuid("Resposta deve ser um UUID valido."),
  })
  .strict();

export const criarRespostaMissaoSchema = z
  .object({
    resposta: z
      .string({ error: "Resposta e obrigatoria." })
      .trim()
      .min(10, "Resposta deve ter no minimo 10 caracteres.")
      .max(5000, "Resposta deve ter no maximo 5000 caracteres."),
    imagemUrl: z.string().trim().url("Imagem deve ser uma URL valida.").optional(),
  })
  .strict();

export const avaliarRespostaMissaoSchema = z
  .object({
    nota: z.coerce
      .number({ error: "Nota e obrigatoria." })
      .min(0, "Nota deve ser maior ou igual a 0.")
      .max(100, "Nota deve ser menor ou igual a 100."),
    feedbackProfessor: z
      .string()
      .trim()
      .max(1000, "Feedback do professor deve ter no maximo 1000 caracteres.")
      .optional(),
  })
  .strict();

export const listarMinhasMissoesSchema = z
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
      .default(20),
  })
  .strict();

export const atualizarMissaoSchema = z
  .object({
    titulo: z
      .string()
      .trim()
      .min(5, "Titulo deve ter no minimo 5 caracteres.")
      .max(150, "Titulo deve ter no maximo 150 caracteres.")
      .optional(),
    descricao: z
      .string()
      .trim()
      .min(10, "Descricao deve ter no minimo 10 caracteres.")
      .optional(),
    criteriosAvaliacao: z.string().trim().optional(),
    prazo: z.coerce.date().optional(),
    pontuacao: z.coerce
      .number()
      .int("Pontuacao deve ser um numero inteiro.")
      .positive("Pontuacao deve ser maior que zero.")
      .optional(),
    dificuldade: dificuldadeMissaoSchema.optional(),
    disciplinaId: z.string().uuid("Disciplina deve ser um UUID valido.").optional(),
  })
  .strict()
  .refine((dados) => Object.keys(dados).length > 0, {
    message: "Informe ao menos um campo para atualizar.",
  });

export const missionsSchemas = {
  avaliarResposta: avaliarRespostaMissaoSchema,
  avaliarRespostaParams: avaliarRespostaMissaoParamsSchema,
  atualizar: atualizarMissaoSchema,
  buscarPorId: buscarMissaoPorIdSchema,
  buscarRespostaParams: buscarRespostaMissaoParamsSchema,
  criar: criarMissaoSchema,
  criarResposta: criarRespostaMissaoSchema,
  listar: listarMissoesSchema,
  listarMinhas: listarMinhasMissoesSchema,
};
