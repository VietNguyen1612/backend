import { GetCommentByPostIdDto } from './dto/get-comment-by-post.dto';
import { Controller } from '@nestjs/common';
import { CommentService } from './comment.service';
import { GrpcMethod } from '@nestjs/microservices';
import { AddCommentToPostDto } from './dto/add-comment-to-post.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}
  @GrpcMethod('CommentService', 'getAllCommentById')
  async getAllCommentById(getCommentByPostIdDto: GetCommentByPostIdDto) {
    return {
      data: await this.commentService.getAllCommentByPostId(
        getCommentByPostIdDto,
      ),
    };
  }
  @GrpcMethod('CommentService', 'addCommentToPost')
  async addCommentToPost(addCommentToPostDto: AddCommentToPostDto) {
    return {
      data: await this.commentService.addCommentToPost(addCommentToPostDto),
    };
  }
}
