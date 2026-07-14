import { ForbiddenError, NotFoundError } from "../../shared/errors/index.js";
import type {
  DashboardProfessorDto,
  MissaoProfessorDashboardDto,
  RankingProfessorDto,
  UsuarioDashboardDto,
} from "./dto.js";
import { DashboardRepository } from "./repository.js";
import type { MissaoDashboard, RespostaRankingDashboard } from "./repository.js";

export class DashboardService {
  public readonly repository = new DashboardRepository();

  public async buscarDashboardProfessor(
    usuario: UsuarioDashboardDto,
  ): Promise<DashboardProfessorDto> {
    const professor = await this.repository.buscarProfessorPorId(usuario.id);

    if (!professor) {
      throw new NotFoundError("Professor nao encontrado.");
    }

    if (professor.perfil !== "PROFESSOR") {
      throw new ForbiddenError("Somente professores podem acessar o dashboard.");
    }

    const [
      totalAlunos,
      totalPublicacoes,
      totalMissoes,
      missoesAtivas,
      publicacoesPendentes,
      respostasAvaliadas,
      missoes,
    ] = await Promise.all([
      this.repository.contarAlunosPorEscola(professor.escola),
      this.repository.contarPublicacoesPorDisciplina(professor.disciplinaId),
      this.repository.contarMissoesPorProfessor(professor.id),
      this.repository.contarMissoesAtivasPorProfessor(professor.id),
      this.repository.contarPublicacoesPendentesPorDisciplina(professor.disciplinaId),
      this.repository.listarRespostasAvaliadasRanking(professor.disciplinaId),
      this.repository.listarMissoesPorProfessor(professor.id),
    ]);

    return {
      indicadores: {
        totalAlunos,
        totalPublicacoes,
        totalMissoes,
        missoesAtivas,
        publicacoesPendentes,
      },
      ranking: this.calcularRanking(respostasAvaliadas),
      missoes: missoes.map((missao) => this.mapearMissao(missao)),
    };
  }

  private calcularRanking(respostas: RespostaRankingDashboard[]): RankingProfessorDto[] {
    const rankingPorAluno = new Map<
      string,
      {
        nomeCompleto: string;
        pontuacao: number;
      }
    >();

    for (const resposta of respostas) {
      const pontuacaoResposta = (resposta.missao.pontuacao * (resposta.nota ?? 0)) / 100;
      const rankingAtual = rankingPorAluno.get(resposta.aluno.id);

      if (!rankingAtual) {
        rankingPorAluno.set(resposta.aluno.id, {
          nomeCompleto: resposta.aluno.nomeCompleto,
          pontuacao: pontuacaoResposta,
        });
        continue;
      }

      rankingAtual.pontuacao += pontuacaoResposta;
    }

    return Array.from(rankingPorAluno.values())
      .sort((a, b) => b.pontuacao - a.pontuacao)
      .slice(0, 5)
      .map((item, index) => ({
        posicao: index + 1,
        nomeCompleto: item.nomeCompleto,
        pontuacao: item.pontuacao,
        nivel: Math.floor(item.pontuacao / 100) + 1,
      }));
  }

  private mapearMissao(missao: MissaoDashboard): MissaoProfessorDashboardDto {
    const respostasRecebidas = missao.respostasMissao.length;
    const respostasAvaliadas = missao.respostasMissao.filter(
      (resposta) => resposta.status === "AVALIADA",
    ).length;

    return {
      id: missao.id,
      titulo: missao.titulo,
      prazo: missao.prazo,
      respostasRecebidas,
      respostasAvaliadas,
      respostasPendentes: respostasRecebidas - respostasAvaliadas,
    };
  }
}
