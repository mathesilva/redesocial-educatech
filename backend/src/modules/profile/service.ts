import { NotFoundError } from "../../shared/errors/index.js";
import type {
  EstatisticasPerfilDto,
  GamificacaoPerfilDto,
  PerfilPublicoRespostaDto,
  PerfilRespostaDto,
  PublicacaoPerfilDto,
  UsuarioAutenticadoPerfilDto,
} from "./dto.js";
import { ProfileRepository } from "./repository.js";
import type { PublicacaoPerfil, RespostaPontuacao } from "./repository.js";

export class ProfileService {
  public readonly repository = new ProfileRepository();

  public async buscarPerfil(usuarioAutenticado: UsuarioAutenticadoPerfilDto): Promise<PerfilRespostaDto> {
    const usuario = await this.repository.buscarUsuarioPorId(usuarioAutenticado.id);

    if (!usuario) {
      throw new NotFoundError("Usuario nao encontrado.");
    }

    const dadosComuns = await this.montarDadosComuns(
      usuario.id,
      this.repository.listarPublicacoesRecentes(usuario.id),
    );

    return { usuario, ...dadosComuns };
  }

  public async buscarPerfilPublico(id: string): Promise<PerfilPublicoRespostaDto> {
    const usuario = await this.repository.buscarUsuarioPublicoPorId(id);

    if (!usuario) {
      throw new NotFoundError("Usuario nao encontrado.");
    }

    const dadosComuns = await this.montarDadosComuns(
      usuario.id,
      this.repository.listarPublicacoesPublicasRecentes(usuario.id),
    );

    return { usuario, ...dadosComuns };
  }

  private async montarDadosComuns(
    usuarioId: string,
    publicacoesPromise: Promise<PublicacaoPerfil[]>,
  ): Promise<{
    gamificacao: GamificacaoPerfilDto;
    estatisticas: EstatisticasPerfilDto;
    publicacoes: PublicacaoPerfilDto[];
  }> {
    const [
      respostasAvaliadas,
      quantidadePublicacoes,
      quantidadeComentarios,
      quantidadeCurtidasRecebidas,
      quantidadeMissoesRespondidas,
      quantidadeMissoesAvaliadas,
      mediaNotas,
      publicacoesRecentes,
    ] = await Promise.all([
      this.repository.listarRespostasAvaliadas(),
      this.repository.contarPublicacoes(usuarioId),
      this.repository.contarComentarios(usuarioId),
      this.repository.somarCurtidasRecebidas(usuarioId),
      this.repository.contarMissoesRespondidas(usuarioId),
      this.repository.contarMissoesAvaliadas(usuarioId),
      this.repository.calcularMediaNotas(usuarioId),
      publicacoesPromise,
    ]);

    return {
      gamificacao: this.calcularGamificacao(usuarioId, respostasAvaliadas),
      estatisticas: {
        quantidadePublicacoes,
        quantidadeComentarios,
        quantidadeCurtidasRecebidas,
        quantidadeMissoesRespondidas,
        quantidadeMissoesAvaliadas,
        mediaNotas,
      },
      publicacoes: publicacoesRecentes.map((publicacao) => this.mapearPublicacao(publicacao)),
    };
  }

  private calcularGamificacao(
    usuarioId: string,
    respostasAvaliadas: RespostaPontuacao[],
  ): GamificacaoPerfilDto {
    const pontuacaoPorAluno = new Map<string, number>();

    for (const resposta of respostasAvaliadas) {
      const pontuacaoResposta = (resposta.missao.pontuacao * (resposta.nota ?? 0)) / 100;
      const pontuacaoAtual = pontuacaoPorAluno.get(resposta.alunoId) ?? 0;

      pontuacaoPorAluno.set(resposta.alunoId, pontuacaoAtual + pontuacaoResposta);
    }

    const pontuacao = pontuacaoPorAluno.get(usuarioId) ?? 0;
    const ranking = Array.from(pontuacaoPorAluno.entries()).sort((a, b) => b[1] - a[1]);
    const indiceRanking = ranking.findIndex(([alunoId]) => alunoId === usuarioId);

    return {
      pontuacao,
      nivel: Math.floor(pontuacao / 100) + 1,
      posicaoRankingGeral: indiceRanking >= 0 ? indiceRanking + 1 : ranking.length + 1,
    };
  }

  private mapearPublicacao(publicacao: PublicacaoPerfil): PublicacaoPerfilDto {
    return {
      id: publicacao.id,
      titulo: publicacao.titulo,
      descricao: publicacao.descricao,
      imagemUrl: publicacao.imagemUrl,
      status: publicacao.status,
      quantidadeComentarios: publicacao.quantidadeComentarios,
      quantidadeCurtidas: publicacao.quantidadeCurtidas,
      dataCriacao: publicacao.dataCriacao,
    };
  }
}
