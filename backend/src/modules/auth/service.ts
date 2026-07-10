import bcrypt from "bcrypt";

import { UnauthorizedError } from "../../shared/errors/index.js";
import type {
  AssinarAccessTokenDto,
  LoginDto,
  LoginRespostaDto,
  UsuarioAutenticadoDto,
} from "./dto.js";
import { AuthRepository } from "./repository.js";

export class AuthService {
  public readonly repository = new AuthRepository();

  public async login(
    dados: LoginDto,
    assinarAccessToken: AssinarAccessTokenDto,
  ): Promise<LoginRespostaDto> {
    const usuario = await this.repository.buscarPorEmail(dados.email);

    if (!usuario) {
      throw new UnauthorizedError("Credenciais invalidas.");
    }

    const senhaValida = await bcrypt.compare(dados.senha, usuario.senha);

    if (!senhaValida) {
      throw new UnauthorizedError("Credenciais invalidas.");
    }

    const accessToken = await assinarAccessToken(
      {
        sub: usuario.id,
        perfil: usuario.perfil,
      },
      { expiresIn: "1h" },
    );

    return {
      accessToken,
      usuario: this.mapearUsuarioAutenticado(usuario),
    };
  }

  public async buscarUsuarioAutenticado(id: string): Promise<UsuarioAutenticadoDto> {
    const usuario = await this.repository.buscarPorId(id);

    if (!usuario) {
      throw new UnauthorizedError("Token invalido.");
    }

    return this.mapearUsuarioAutenticado(usuario);
  }

  private mapearUsuarioAutenticado(usuario: {
    id: string;
    nomeCompleto: string;
    email: string;
    perfil: UsuarioAutenticadoDto["perfil"];
  }): UsuarioAutenticadoDto {
    return {
      id: usuario.id,
      nomeCompleto: usuario.nomeCompleto,
      email: usuario.email,
      perfil: usuario.perfil,
    };
  }
}
