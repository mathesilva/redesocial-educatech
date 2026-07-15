import type { TipoNotificacao } from "@prisma/client";
import { z } from "zod";

import { marcarNotificacaoLidaParamsSchema } from "./schemas.js";

export type MarcarNotificacaoLidaParamsDto = z.infer<
  typeof marcarNotificacaoLidaParamsSchema
>;

export interface UsuarioNotificacaoDto {
  id: string;
}

export interface NotificacaoRespostaDto {
  id: string;
  titulo: string;
  mensagem: string;
  tipo: TipoNotificacao;
  lida: boolean;
  dataCriacao: Date;
}

export type NotificationsDto = NotificacaoRespostaDto;
