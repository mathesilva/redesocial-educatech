import { MissionsRepository } from "./repository.js";

export class MissionsService {
  public readonly repository = new MissionsRepository();
}
