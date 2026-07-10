import type { UsuarioAutenticadoDto } from "../../modules/auth/dto.js";

declare module "fastify" {
  interface FastifyRequest {
    usuarioAutenticado?: UsuarioAutenticadoDto;
  }
}
