import { AppError } from "./app-error.js";

export class UnauthorizedError extends AppError {
  public constructor(mensagem = "Nao autorizado.", erros: unknown[] = []) {
    super(mensagem, 401, erros);
  }
}
