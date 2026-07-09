import { AppError } from "./app-error.js";

export class NotFoundError extends AppError {
  public constructor(mensagem = "Recurso nao encontrado.", erros: unknown[] = []) {
    super(mensagem, 404, erros);
  }
}
