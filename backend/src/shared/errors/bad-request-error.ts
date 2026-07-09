import { AppError } from "./app-error.js";

export class BadRequestError extends AppError {
  public constructor(mensagem = "Dados inválidos.", erros: unknown[] = []) {
    super(mensagem, 400, erros);
  }
}
