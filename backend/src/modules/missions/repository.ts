import { prisma } from "../../shared/prisma/index.js";

export class MissionsRepository {
  protected readonly prisma = prisma;
}
