import { prisma } from "../../shared/prisma/index.js";

export class NotificationsRepository {
  protected readonly prisma = prisma;
}
