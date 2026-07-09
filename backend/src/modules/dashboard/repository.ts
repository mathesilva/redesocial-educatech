import { prisma } from "../../shared/prisma/index.js";

export class DashboardRepository {
  protected readonly prisma = prisma;
}
