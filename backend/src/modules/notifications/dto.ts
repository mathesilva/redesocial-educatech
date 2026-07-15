import type { PerfilUsuario, TipoNotificacao } from "@prisma/client";
import { z } from "zod";

import {
  atualizarNotificacaoSchema,
  criarNotificacaoSchema,
  notificacaoIdParamsSchema,
} from "./schemas.js";

export type NotificacaoIdParamsDto = z.infer<typeof notificacaoIdParamsSchema>;
export type CriarNotificacaoDto = z.infer<typeof criarNotificacaoSchema>;
export type AtualizarNotificacaoDto = z.infer<typeof atualizarNotificacaoSchema>;

export interface UsuarioNotificacaoDto {
  id: string;
  perfil: PerfilUsuario;
}

export interface NotificacaoRespostaDto {
  id: string;
  titulo: string;
  mensagem: string;
  tipo: TipoNotificacao;
  lida: boolean;
  missaoId: string | null;
  dataCriacao: Date;
}

export type NotificationsDto = NotificacaoRespostaDto;
