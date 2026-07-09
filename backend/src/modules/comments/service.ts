import { CommentsRepository } from "./repository.js";

export class CommentsService {
  public readonly repository = new CommentsRepository();
}
