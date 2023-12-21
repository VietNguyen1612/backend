import { Injectable } from '@nestjs/common';
import { CommentRepository } from './comment.repository';
import { GetCommentByPostIdDto } from './dto/get-comment-by-post.dto';
import { AddCommentToPostDto } from './dto/add-comment-to-post.dto';

@Injectable()
export class CommentService {
  constructor(private readonly commentRepository: CommentRepository) { }

  async getAllCommentByPostId(getCommentByPostIdDto: GetCommentByPostIdDto) {
    return await this.commentRepository.getByCondition({
      postId: getCommentByPostIdDto.postId,
    });
  }
  async addCommentToPost(addCommentToPostDto: AddCommentToPostDto) {
    return await this.commentRepository.create(addCommentToPostDto);
  }

  async likeComment(commentId: string) {
    return await this.commentRepository.findByIdAndUpdate(commentId, {
      $inc: { like: 1 },
    });
  }
}
