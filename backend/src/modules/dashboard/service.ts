import { DashboardRepository } from "./repository.js";

export class DashboardService {
  public readonly repository = new DashboardRepository();
}
