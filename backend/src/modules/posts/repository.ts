import { prisma } from "../../shared/prisma/index.js";

export class PostsRepository {
  protected readonly prisma = prisma;
}
