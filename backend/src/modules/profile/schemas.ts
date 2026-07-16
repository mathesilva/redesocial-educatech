import { z } from "zod";

export const buscarPerfilPublicoParamsSchema = z
  .object({
    id: z.string().uuid("Usuario deve ser um UUID valido."),
  })
  .strict();

export const profileSchemas = {
  buscarPerfilPublicoParams: buscarPerfilPublicoParamsSchema,
};
