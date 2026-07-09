export class AppError extends Error {
  public readonly statusCode: number;
  public readonly erros: unknown[];

  public constructor(mensagem: string, statusCode: number, erros: unknown[] = []) {
    super(mensagem);
    this.name = new.target.name;
    this.statusCode = statusCode;
    this.erros = erros;
  }
}
