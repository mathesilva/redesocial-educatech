export interface RespostaSucesso<TDados> {
  sucesso: true;
  mensagem: string;
  dados: TDados;
}

export interface RespostaErro {
  sucesso: false;
  mensagem: string;
  erros: unknown[];
}
