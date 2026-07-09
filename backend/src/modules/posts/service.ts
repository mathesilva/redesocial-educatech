import { PostsRepository } from "./repository.js";

export class PostsService {
  public readonly repository = new PostsRepository();
}
