import type { RespostaErro, RespostaSucesso } from "../types/api-response.js";

export function respostaSucesso<TDados>(
  mensagem: string,
  dados: TDados,
): RespostaSucesso<TDados> {
  return {
    sucesso: true,
    mensagem,
    dados,
  };
}

export function respostaErro(mensagem: string, erros: unknown[] = []): RespostaErro {
  return {
    sucesso: false,
    mensagem,
    erros,
  };
}
