import { AppError } from "./app-error.js";

export class ConflictError extends AppError {
  public constructor(mensagem = "Conflito ao processar a requisicao.", erros: unknown[] = []) {
    super(mensagem, 409, erros);
  }
}
