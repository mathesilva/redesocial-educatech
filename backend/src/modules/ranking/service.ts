import { RankingRepository } from "./repository.js";

export class RankingService {
  public readonly repository = new RankingRepository();
}
