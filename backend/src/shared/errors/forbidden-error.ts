import { AppError } from "./app-error.js";

export class ForbiddenError extends AppError {
  public constructor(mensagem = "Acesso negado.", erros: unknown[] = []) {
    super(mensagem, 403, erros);
  }
}
