import { prisma } from "../../shared/prisma/index.js";

export class RankingRepository {
  protected readonly prisma = prisma;
}
