import { Prisma } from "@prisma/client";

import {
  BadRequestError,
  ConflictError,
  ForbiddenError,
  NotFoundError,
} from "../../shared/errors/index.js";
import type {
  AvaliarRespostaMissaoDto,
  CriarMissaoDto,
  CriarRespostaMissaoDto,
  ListarMissoesDto,
  ListarMissoesRespostaDto,
  MissaoRespostaDto,
  RespostaMissaoProfessorRespostaDto,
  RespostaMissaoRespostaDto,
  UsuarioMissaoDto,
} from "./dto.js";
import { MissionsRepository } from "./repository.js";
import type { MissaoComRelacoes, RespostaMissaoComAluno } from "./repository.js";

export class MissionsService {
  public readonly repository = new MissionsRepository();

  public async criar(dados: CriarMissaoDto, usuario: UsuarioMissaoDto): Promise<MissaoRespostaDto> {
    if (usuario.perfil !== "PROFESSOR") {
      throw new ForbiddenError("Somente professores podem criar missoes.");
    }

    if (dados.prazo <= new Date()) {
      throw new BadRequestError("Prazo deve ser uma data futura.");
    }

    const [disciplina, professor] = await Promise.all([
      this.repository.buscarDisciplinaPorId(dados.disciplinaId),
      this.repository.buscarProfessorPorId(usuario.id),
    ]);

    if (!disciplina) {
      throw new NotFoundError("Disciplina nao encontrada.");
    }

    if (!professor || professor.perfil !== "PROFESSOR") {
      throw new ForbiddenError("Professor autenticado invalido.");
    }

    const missao = await this.repository.criar({
      titulo: dados.titulo,
      descricao: dados.descricao,
      criteriosAvaliacao: dados.criteriosAvaliacao ?? null,
      prazo: dados.prazo,
      pontuacao: dados.pontuacao,
      dificuldade: dados.dificuldade,
      professorId: usuario.id,
      disciplinaId: dados.disciplinaId,
    });

    return this.mapearMissao(missao);
  }

  public async listar(dados: ListarMissoesDto): Promise<ListarMissoesRespostaDto> {
    const [missoes, total] = await Promise.all([
      this.repository.listar(dados),
      this.repository.contar(dados),
    ]);

    return {
      itens: missoes.map((missao) => this.mapearMissao(missao)),
      paginacao: {
        pagina: dados.pagina,
        limite: dados.limite,
        total,
        totalPaginas: Math.ceil(total / dados.limite),
      },
    };
  }

  public async buscarPorId(id: string): Promise<MissaoRespostaDto> {
    const missao = await this.repository.buscarPorId(id);

    if (!missao) {
      throw new NotFoundError("Missao nao encontrada.");
    }

    return this.mapearMissao(missao);
  }

  public async responder(
    missaoId: string,
    dados: CriarRespostaMissaoDto,
    usuario: UsuarioMissaoDto,
  ): Promise<RespostaMissaoRespostaDto> {
    if (usuario.perfil !== "ALUNO") {
      throw new ForbiddenError("Somente alunos podem responder missoes.");
    }

    const missao = await this.repository.buscarPorId(missaoId);

    if (!missao) {
      throw new NotFoundError("Missao nao encontrada.");
    }

    if (missao.prazo <= new Date()) {
      throw new BadRequestError("Nao e permitido responder missao vencida.");
    }

    const respostaExistente = await this.repository.buscarRespostaPorAlunoEMissao(
      usuario.id,
      missaoId,
    );

    if (respostaExistente) {
      throw new ConflictError("Aluno ja enviou resposta para esta missao.");
    }

    try {
      const resposta = await this.repository.criarResposta({
        resposta: dados.resposta,
        imagemUrl: dados.imagemUrl ?? null,
        alunoId: usuario.id,
        missaoId,
      });

      return this.mapearRespostaMissao(resposta);
    } catch (error) {
      if (this.eErroRestricaoUnica(error)) {
        throw new ConflictError("Aluno ja enviou resposta para esta missao.");
      }

      throw error;
    }
  }

  public async buscarMinhaResposta(
    missaoId: string,
    usuario: UsuarioMissaoDto,
  ): Promise<RespostaMissaoRespostaDto> {
    if (usuario.perfil !== "ALUNO") {
      throw new ForbiddenError("Somente alunos podem consultar sua resposta.");
    }

    const missao = await this.repository.buscarPorId(missaoId);

    if (!missao) {
      throw new NotFoundError("Missao nao encontrada.");
    }

    const resposta = await this.repository.buscarRespostaPorAlunoEMissao(usuario.id, missaoId);

    if (!resposta) {
      throw new NotFoundError("Resposta da missao nao encontrada.");
    }

    return this.mapearRespostaMissao(resposta);
  }

  public async avaliarResposta(
    missaoId: string,
    respostaId: string,
    dados: AvaliarRespostaMissaoDto,
    usuario: UsuarioMissaoDto,
  ): Promise<RespostaMissaoRespostaDto> {
    await this.validarProfessorResponsavel(missaoId, usuario);

    const resposta = await this.repository.buscarRespostaPorId(respostaId);

    if (!resposta || resposta.missaoId !== missaoId) {
      throw new NotFoundError("Resposta da missao nao encontrada.");
    }

    if (resposta.status === "AVALIADA") {
      throw new ConflictError("Resposta ja avaliada.");
    }

    const respostaAvaliada = await this.repository.avaliarResposta(respostaId, {
      nota: dados.nota,
      feedbackProfessor: dados.feedbackProfessor ?? null,
    });

    return this.mapearRespostaMissao(respostaAvaliada);
  }

  public async listarRespostas(
    missaoId: string,
    usuario: UsuarioMissaoDto,
  ): Promise<RespostaMissaoProfessorRespostaDto[]> {
    await this.validarProfessorResponsavel(missaoId, usuario);

    const respostas = await this.repository.listarRespostasPorMissao(missaoId);

    return respostas.map((resposta) => this.mapearRespostaMissaoProfessor(resposta));
  }

  private mapearMissao(missao: MissaoComRelacoes): MissaoRespostaDto {
    return {
      id: missao.id,
      titulo: missao.titulo,
      descricao: missao.descricao,
      criteriosAvaliacao: missao.criteriosAvaliacao,
      prazo: missao.prazo,
      pontuacao: missao.pontuacao,
      dificuldade: missao.dificuldade,
      professor: {
        id: missao.professor.id,
        nomeCompleto: missao.professor.nomeCompleto,
        perfil: missao.professor.perfil,
      },
      disciplina: {
        id: missao.disciplina.id,
        nome: missao.disciplina.nome,
      },
      dataCriacao: missao.dataCriacao,
    };
  }

  private mapearRespostaMissao(resposta: {
    resposta: string;
    status: RespostaMissaoRespostaDto["status"];
    nota: number | null;
    feedbackProfessor: string | null;
    dataEnvio: Date;
  }): RespostaMissaoRespostaDto {
    return {
      resposta: resposta.resposta,
      status: resposta.status,
      nota: resposta.nota,
      feedbackProfessor: resposta.feedbackProfessor,
      dataEnvio: resposta.dataEnvio,
    };
  }

  private mapearRespostaMissaoProfessor(
    resposta: RespostaMissaoComAluno,
  ): RespostaMissaoProfessorRespostaDto {
    return {
      id: resposta.id,
      resposta: resposta.resposta,
      imagemUrl: resposta.imagemUrl,
      aluno: {
        id: resposta.aluno.id,
        nomeCompleto: resposta.aluno.nomeCompleto,
        email: resposta.aluno.email,
      },
      status: resposta.status,
      nota: resposta.nota,
      feedbackProfessor: resposta.feedbackProfessor,
      dataEnvio: resposta.dataEnvio,
    };
  }

  private async validarProfessorResponsavel(
    missaoId: string,
    usuario: UsuarioMissaoDto,
  ): Promise<MissaoComRelacoes> {
    if (usuario.perfil !== "PROFESSOR") {
      throw new ForbiddenError("Somente professores podem acessar respostas da missao.");
    }

    const missao = await this.repository.buscarPorId(missaoId);

    if (!missao) {
      throw new NotFoundError("Missao nao encontrada.");
    }

    if (missao.professorId !== usuario.id) {
      throw new ForbiddenError("Professor nao autorizado para esta missao.");
    }

    return missao;
  }

  private eErroRestricaoUnica(error: unknown): boolean {
    return error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002";
  }
}
