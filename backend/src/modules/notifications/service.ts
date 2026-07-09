import { NotificationsRepository } from "./repository.js";

export class NotificationsService {
  public readonly repository = new NotificationsRepository();
}
