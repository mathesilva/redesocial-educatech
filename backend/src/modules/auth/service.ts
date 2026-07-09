import { AuthRepository } from "./repository.js";

export class AuthService {
  public readonly repository = new AuthRepository();
}
