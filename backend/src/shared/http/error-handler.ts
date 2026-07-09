import type { FastifyError, FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { ZodError } from "zod";

import { AppError } from "../errors/index.js";
import { respostaErro } from "./api-response.js";

export function registerErrorHandler(app: FastifyInstance): void {
  app.setErrorHandler(
    (error: FastifyError | Error, request: FastifyRequest, reply: FastifyReply) => {
      request.log.error(error);

      if (error instanceof AppError) {
        return reply.status(error.statusCode).send(respostaErro(error.message, error.erros));
      }

      if (error instanceof ZodError) {
        return reply.status(400).send(respostaErro("Dados inválidos.", error.issues));
      }

      return reply.status(500).send(respostaErro("Erro interno do servidor."));
    },
  );
}
