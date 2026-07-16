import { Prisma } from "@prisma/client";

import {
  BadRequestError,
  ConflictError,
  ForbiddenError,
  NotFoundError,
} from "../../shared/errors/index.js";
import type {
  AtualizarMissaoDto,
  AvaliarRespostaMissaoDto,
  CriarMissaoDto,
  CriarRespostaMissaoDto,
  ListarMinhasMissoesDto,
  ListarMinhasMissoesRespostaDto,
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

    const missao = await this.repository.criarComNotificacoes({
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

  public async listarMinhas(
    usuario: UsuarioMissaoDto,
    filtros: ListarMinhasMissoesDto,
  ): Promise<ListarMinhasMissoesRespostaDto> {
    if (usuario.perfil !== "PROFESSOR") {
      throw new ForbiddenError("Somente professores podem listar seus proprios desafios.");
    }

    const [missoes, total] = await Promise.all([
      this.repository.listarPorProfessor(usuario.id, filtros),
      this.repository.contarPorProfessor(usuario.id),
    ]);

    const contagens = await this.repository.contarRespostasPorMissoes(
      missoes.map((missao) => missao.id),
    );

    const contagemPorMissao = new Map<
      string,
      { iniciados: number; recebidas: number; concluidas: number }
    >();

    for (const missao of missoes) {
      contagemPorMissao.set(missao.id, { iniciados: 0, recebidas: 0, concluidas: 0 });
    }

    for (const grupo of contagens) {
      const atual = contagemPorMissao.get(grupo.missaoId);

      if (!atual) {
        continue;
      }

      atual.iniciados += grupo.quantidade;

      if (grupo.status === "ENVIADA" || grupo.status === "AVALIADA") {
        atual.recebidas += grupo.quantidade;
      }

      if (grupo.status === "AVALIADA") {
        atual.concluidas += grupo.quantidade;
      }
    }

    const agora = new Date();

    return {
      itens: missoes.map((missao) => {
        const contagem = contagemPorMissao.get(missao.id) ?? {
          iniciados: 0,
          recebidas: 0,
          concluidas: 0,
        };

        return {
          ...this.mapearMissao(missao),
          ativa: missao.prazo > agora,
          quantidadeIniciados: contagem.iniciados,
          quantidadeRespostasRecebidas: contagem.recebidas,
          quantidadeConcluidas: contagem.concluidas,
        };
      }),
      paginacao: {
        pagina: filtros.pagina,
        limite: filtros.limite,
        total,
        totalPaginas: Math.ceil(total / filtros.limite),
      },
    };
  }

  public async atualizar(
    id: string,
    dados: AtualizarMissaoDto,
    usuario: UsuarioMissaoDto,
  ): Promise<MissaoRespostaDto> {
    await this.validarProfessorResponsavel(id, usuario);

    const missaoAtualizada = await this.repository.atualizar(id, {
      ...(dados.titulo !== undefined && { titulo: dados.titulo }),
      ...(dados.descricao !== undefined && { descricao: dados.descricao }),
      ...(dados.criteriosAvaliacao !== undefined && {
        criteriosAvaliacao: dados.criteriosAvaliacao,
      }),
      ...(dados.prazo !== undefined && { prazo: dados.prazo }),
      ...(dados.pontuacao !== undefined && { pontuacao: dados.pontuacao }),
      ...(dados.dificuldade !== undefined && { dificuldade: dados.dificuldade }),
      ...(dados.disciplinaId !== undefined && { disciplinaId: dados.disciplinaId }),
    });

    return this.mapearMissao(missaoAtualizada);
  }

  public async excluir(id: string, usuario: UsuarioMissaoDto): Promise<void> {
    await this.validarProfessorResponsavel(id, usuario);

    const quantidadeRespostas = await this.repository.contarRespostasDaMissao(id);

    if (quantidadeRespostas > 0) {
      throw new ConflictError(
        "Nao e possivel excluir um desafio que ja possui respostas de alunos.",
      );
    }

    await this.repository.excluir(id);
  }

  public async iniciar(
    missaoId: string,
    usuario: UsuarioMissaoDto,
  ): Promise<RespostaMissaoRespostaDto> {
    if (usuario.perfil !== "ALUNO") {
      throw new ForbiddenError("Somente alunos podem iniciar missoes.");
    }

    const missao = await this.repository.buscarPorId(missaoId);

    if (!missao) {
      throw new NotFoundError("Missao nao encontrada.");
    }

    if (missao.prazo <= new Date()) {
      throw new BadRequestError("Nao e permitido iniciar missao vencida.");
    }

    const respostaExistente = await this.repository.buscarRespostaPorAlunoEMissao(
      usuario.id,
      missaoId,
    );

    if (respostaExistente) {
      return this.mapearRespostaMissao(respostaExistente);
    }

    try {
      const resposta = await this.repository.iniciarResposta({
        alunoId: usuario.id,
        missaoId,
      });

      return this.mapearRespostaMissao(resposta);
    } catch (error) {
      if (this.eErroRestricaoUnica(error)) {
        const respostaConcorrente = await this.repository.buscarRespostaPorAlunoEMissao(
          usuario.id,
          missaoId,
        );

        if (respostaConcorrente) {
          return this.mapearRespostaMissao(respostaConcorrente);
        }
      }

      throw error;
    }
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

    if (respostaExistente && respostaExistente.status !== "INICIADA") {
      throw new ConflictError("Aluno ja enviou resposta para esta missao.");
    }

    try {
      const resposta = respostaExistente
        ? await this.repository.enviarResposta(respostaExistente.id, {
            resposta: dados.resposta,
            imagemUrl: dados.imagemUrl ?? null,
          })
        : await this.repository.criarResposta({
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
    const missao = await this.validarProfessorResponsavel(missaoId, usuario);

    const resposta = await this.repository.buscarRespostaPorId(respostaId);

    if (!resposta || resposta.missaoId !== missaoId) {
      throw new NotFoundError("Resposta da missao nao encontrada.");
    }

    if (resposta.status === "AVALIADA") {
      throw new ConflictError("Resposta ja avaliada.");
    }

    if (resposta.status === "INICIADA") {
      throw new ConflictError("Aluno ainda nao enviou a resposta desta missao.");
    }

    // Reprovacao corresponde a nota 0 (aluno nao pontua). Nesse caso o aluno
    // recebe uma notificacao informando que a resposta foi reprovada.
    const reprovada = dados.nota === 0;
    const notificacao = reprovada
      ? {
          usuarioId: resposta.alunoId,
          missaoId,
          titulo: "Resposta reprovada",
          mensagem: `Sua resposta para o desafio "${missao.titulo}" foi reprovada pelo professor. Acesse a missao para ver o feedback.`,
          tipo: "AVALIACAO" as const,
        }
      : undefined;

    const respostaAvaliada = await this.repository.avaliarResposta(
      respostaId,
      {
        nota: dados.nota,
        feedbackProfessor: dados.feedbackProfessor ?? null,
      },
      notificacao,
    );

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
    resposta: string | null;
    status: RespostaMissaoRespostaDto["status"];
    nota: number | null;
    feedbackProfessor: string | null;
    dataInicio: Date;
    dataEnvio: Date | null;
  }): RespostaMissaoRespostaDto {
    return {
      resposta: resposta.resposta,
      status: resposta.status,
      nota: resposta.nota,
      feedbackProfessor: resposta.feedbackProfessor,
      dataInicio: resposta.dataInicio,
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
        turma: resposta.aluno.turma,
      },
      status: resposta.status,
      nota: resposta.nota,
      feedbackProfessor: resposta.feedbackProfessor,
      dataInicio: resposta.dataInicio,
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
