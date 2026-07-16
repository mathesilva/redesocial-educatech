import { z } from "zod";

const tipoNotificacaoSchema = z.enum([
  "CURTIDA",
  "COMENTARIO",
  "MISSAO",
  "PUBLICACAO_APROVADA",
  "PUBLICACAO_REPROVADA",
  "AVALIACAO",
]);

export const notificacaoIdParamsSchema = z
  .object({
    id: z.string().uuid("Notificacao deve ser um UUID valido."),
  })
  .strict();

export const criarNotificacaoSchema = z
  .object({
    usuarioId: z
      .string({ error: "Usuario e obrigatorio." })
      .uuid("Usuario deve ser um UUID valido."),
    titulo: z
      .string({ error: "Titulo e obrigatorio." })
      .trim()
      .min(3, "Titulo deve ter no minimo 3 caracteres.")
      .max(150, "Titulo deve ter no maximo 150 caracteres."),
    mensagem: z
      .string({ error: "Mensagem e obrigatoria." })
      .trim()
      .min(3, "Mensagem deve ter no minimo 3 caracteres.")
      .max(1000, "Mensagem deve ter no maximo 1000 caracteres."),
    tipo: tipoNotificacaoSchema,
  })
  .strict();

export const atualizarNotificacaoSchema = z
  .object({
    titulo: z
      .string()
      .trim()
      .min(3, "Titulo deve ter no minimo 3 caracteres.")
      .max(150, "Titulo deve ter no maximo 150 caracteres.")
      .optional(),
    mensagem: z
      .string()
      .trim()
      .min(3, "Mensagem deve ter no minimo 3 caracteres.")
      .max(1000, "Mensagem deve ter no maximo 1000 caracteres.")
      .optional(),
    tipo: tipoNotificacaoSchema.optional(),
  })
  .strict()
  .refine((dados) => Object.keys(dados).length > 0, {
    message: "Informe ao menos um campo para atualizar.",
  });

export const notificationsSchemas = {
  notificacaoIdParams: notificacaoIdParamsSchema,
  criar: criarNotificacaoSchema,
  atualizar: atualizarNotificacaoSchema,
};
