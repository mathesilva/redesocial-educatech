import { PerfilUsuario } from "@prisma/client";
import type { FastifyInstance } from "fastify";

import { autenticar, permitirPerfis } from "../auth/index.js";
import { MissionsController } from "./controller.js";

export function missionsRoutes(app: FastifyInstance): void {
  const controller = new MissionsController();
  const autenticarUsuario = autenticar(app);

  app.post(
    "/api/missoes",
    { preHandler: [autenticarUsuario, permitirPerfis([PerfilUsuario.PROFESSOR])] },
    controller.criar,
  );
  app.get("/api/missoes", { preHandler: autenticarUsuario }, controller.listar);
  app.post(
    "/api/missoes/:missaoId/iniciar",
    { preHandler: [autenticarUsuario, permitirPerfis([PerfilUsuario.ALUNO])] },
    controller.iniciar,
  );
  app.post(
    "/api/missoes/:missaoId/respostas",
    { preHandler: [autenticarUsuario, permitirPerfis([PerfilUsuario.ALUNO])] },
    controller.responder,
  );
  app.get(
    "/api/missoes/:missaoId/respostas",
    { preHandler: [autenticarUsuario, permitirPerfis([PerfilUsuario.PROFESSOR])] },
    controller.listarRespostas,
  );
  app.get(
    "/api/missoes/:missaoId/respostas/minha",
    { preHandler: [autenticarUsuario, permitirPerfis([PerfilUsuario.ALUNO])] },
    controller.buscarMinhaResposta,
  );
  app.patch(
    "/api/missoes/:missaoId/respostas/:respostaId/avaliacao",
    { preHandler: [autenticarUsuario, permitirPerfis([PerfilUsuario.PROFESSOR])] },
    controller.avaliarResposta,
  );
  app.get(
    "/api/missoes/minhas",
    { preHandler: [autenticarUsuario, permitirPerfis([PerfilUsuario.PROFESSOR])] },
    controller.listarMinhas,
  );
  app.get("/api/missoes/:id", { preHandler: autenticarUsuario }, controller.buscarPorId);
  app.patch(
    "/api/missoes/:id",
    { preHandler: [autenticarUsuario, permitirPerfis([PerfilUsuario.PROFESSOR])] },
    controller.atualizar,
  );
  app.delete(
    "/api/missoes/:id",
    { preHandler: [autenticarUsuario, permitirPerfis([PerfilUsuario.PROFESSOR])] },
    controller.excluir,
  );
}
