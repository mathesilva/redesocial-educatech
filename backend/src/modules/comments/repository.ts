import { prisma } from "../../shared/prisma/index.js";

export class CommentsRepository {
  protected readonly prisma = prisma;
}
