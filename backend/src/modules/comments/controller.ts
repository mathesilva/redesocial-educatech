import { CommentsService } from "./service.js";

export class CommentsController {
  public readonly service = new CommentsService();
}
