import type { Prisma } from "@prisma/client";

import { prisma } from "../../shared/prisma/index.js";
import type { ListarRankingDto } from "./dto.js";

const respostaRankingSelect = {
  nota: true,
  aluno: {
    select: {
      id: true,
      nomeCompleto: true,
      email: true,
    },
  },
  missao: {
    select: {
      pontuacao: true,
    },
  },
} satisfies Prisma.RespostaMissaoSelect;

export type RespostaRanking = Prisma.RespostaMissaoGetPayload<{
  select: typeof respostaRankingSelect;
}>;

export class RankingRepository {
  protected readonly prisma = prisma;

  public async listarRespostasAvaliadas(filtros: ListarRankingDto): Promise<RespostaRanking[]> {
    const where: Prisma.RespostaMissaoWhereInput = {
      status: "AVALIADA",
    };

    if (filtros.disciplinaId) {
      where.missao = {
        disciplinaId: filtros.disciplinaId,
      };
    }

    return this.prisma.respostaMissao.findMany({
      where,
      select: respostaRankingSelect,
    });
  }
}
