import { PostsService } from "./service.js";

export class PostsController {
  public readonly service = new PostsService();
}
