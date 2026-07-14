import type { ItemRankingDto, ListarRankingDto } from "./dto.js";
import { RankingRepository } from "./repository.js";

export class RankingService {
  public readonly repository = new RankingRepository();

  public async listar(filtros: ListarRankingDto): Promise<ItemRankingDto[]> {
    const respostas = await this.repository.listarRespostasAvaliadas(filtros);
    const rankingPorAluno = new Map<string, Omit<ItemRankingDto, "posicao" | "nivel">>();

    for (const resposta of respostas) {
      const pontuacaoResposta = (resposta.missao.pontuacao * (resposta.nota ?? 0)) / 100;
      const rankingAtual = rankingPorAluno.get(resposta.aluno.id);

      if (!rankingAtual) {
        rankingPorAluno.set(resposta.aluno.id, {
          aluno: resposta.aluno,
          pontuacao: pontuacaoResposta,
        });
        continue;
      }

      rankingAtual.pontuacao += pontuacaoResposta;
    }

    return Array.from(rankingPorAluno.values())
      .sort((a, b) => b.pontuacao - a.pontuacao)
      .map((item, index) => ({
        posicao: index + 1,
        aluno: item.aluno,
        pontuacao: item.pontuacao,
        nivel: Math.floor(item.pontuacao / 100) + 1,
      }));
  }
}
