import { z } from "zod";

export const marcarNotificacaoLidaParamsSchema = z
  .object({
    id: z.string().uuid("Notificacao deve ser um UUID valido."),
  })
  .strict();

export const notificationsSchemas = {
  marcarLidaParams: marcarNotificacaoLidaParamsSchema,
};
