import { prisma } from "../../shared/prisma/index.js";

export class AuthRepository {
  protected readonly prisma = prisma;
}
