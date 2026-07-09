import { AppError } from "./app-error.js";

export class InternalServerError extends AppError {
  public constructor(mensagem = "Erro interno do servidor.", erros: unknown[] = []) {
    super(mensagem, 500, erros);
  }
}
