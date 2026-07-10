import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

import { UnauthorizedError } from "../../shared/errors/index.js";
import type { AuthTokenPayloadDto } from "./dto.js";
import { AuthService } from "./service.js";

export function autenticar(app: FastifyInstance) {
  const service = new AuthService();

  return async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    void reply;

    const token = extrairBearerToken(request);

    try {
      const payload = app.jwt.verify<AuthTokenPayloadDto>(token);

      if (!payload.sub) {
        throw new UnauthorizedError("Token invalido.");
      }

      request.usuarioAutenticado = await service.buscarUsuarioAutenticado(payload.sub);
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        throw error;
      }

      throw new UnauthorizedError(obterMensagemToken(error));
    }
  };
}

function extrairBearerToken(request: FastifyRequest): string {
  const authorization = request.headers.authorization;

  if (!authorization) {
    throw new UnauthorizedError("Token invalido.");
  }

  const [tipo, token] = authorization.split(" ");

  if (tipo !== "Bearer" || !token) {
    throw new UnauthorizedError("Token invalido.");
  }

  return token;
}

function obterMensagemToken(error: unknown): string {
  const codigo = obterCodigoErro(error);

  if (codigo === "FST_JWT_AUTHORIZATION_TOKEN_EXPIRED" || codigo === "FAST_JWT_EXPIRED") {
    return "Token expirado.";
  }

  return "Token invalido.";
}

function obterCodigoErro(error: unknown): string | null {
  if (typeof error !== "object" || error === null || !("code" in error)) {
    return null;
  }

  const { code } = error as { code?: unknown };

  return typeof code === "string" ? code : null;
}
