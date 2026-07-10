import { z } from "zod";

export const loginSchema = z
  .object({
    email: z
      .string({ error: "E-mail e obrigatorio." })
      .trim()
      .email("E-mail deve possuir um formato valido."),
    senha: z.string({ error: "Senha e obrigatoria." }).min(1, "Senha e obrigatoria."),
  })
  .strict();

export const authSchemas = {
  login: loginSchema,
};
