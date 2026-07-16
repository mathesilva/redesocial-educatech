import { z } from "zod";

const perfilUsuarioSchema = z.enum(["ALUNO", "PROFESSOR"]);

export const cadastrarUsuarioSchema = z
  .object({
    nomeCompleto: z
      .string({ error: "Nome completo e obrigatorio." })
      .trim()
      .min(3, "Nome completo deve ter no minimo 3 caracteres."),
    email: z
      .string({ error: "E-mail e obrigatorio." })
      .trim()
      .email("E-mail deve possuir um formato valido."),
    senha: z
      .string({ error: "Senha e obrigatoria." })
      .min(8, "Senha deve ter no minimo 8 caracteres."),
    confirmarSenha: z.string({ error: "Confirmacao de senha e obrigatoria." }),
    perfil: perfilUsuarioSchema,
    escola: z
      .string({ error: "Escola e obrigatoria." })
      .trim()
      .min(1, "Escola e obrigatoria."),
    turma: z
      .string()
      .trim()
      .min(1, "Turma e obrigatoria para aluno.")
      .nullable()
      .optional(),
    disciplinaId: z.string().uuid("Disciplina deve ser um UUID valido.").nullable().optional(),
  })
  .strict()
  .superRefine((dados, contexto) => {
    if (dados.confirmarSenha !== dados.senha) {
      contexto.addIssue({
        code: "custom",
        message: "Confirmacao de senha deve ser igual a senha.",
        path: ["confirmarSenha"],
      });
    }

    if (dados.perfil === "ALUNO") {
      if (!dados.turma) {
        contexto.addIssue({
          code: "custom",
          message: "Turma e obrigatoria para aluno.",
          path: ["turma"],
        });
      }

      if (dados.disciplinaId) {
        contexto.addIssue({
          code: "custom",
          message: "Disciplina deve ser nula para aluno.",
          path: ["disciplinaId"],
        });
      }
    }

    if (dados.perfil === "PROFESSOR") {
      if (!dados.disciplinaId) {
        contexto.addIssue({
          code: "custom",
          message: "Disciplina e obrigatoria para professor.",
          path: ["disciplinaId"],
        });
      }

      if (dados.turma) {
        contexto.addIssue({
          code: "custom",
          message: "Turma deve ser nula para professor.",
          path: ["turma"],
        });
      }
    }
  });

export const buscarUsuariosSchema = z
  .object({
    busca: z.string().trim().min(1, "Informe um termo de busca.").optional(),
    pagina: z.coerce
      .number()
      .int("Pagina deve ser um numero inteiro.")
      .min(1, "Pagina deve ser maior ou igual a 1.")
      .default(1),
    limite: z.coerce
      .number()
      .int("Limite deve ser um numero inteiro.")
      .min(1, "Limite deve ser maior ou igual a 1.")
      .max(50, "Limite deve ser no maximo 50.")
      .default(20),
  })
  .strict();

export const usersSchemas = {
  cadastrarUsuario: cadastrarUsuarioSchema,
  buscarUsuarios: buscarUsuariosSchema,
};
