import { PostService } from './../post/post.service';
import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AddCommentToPostDto } from './dto/add-comment-to-post.dto';
import { CommentService } from './comment.service';
import { User } from 'src/common/model/user.model';
import { CurrentUser } from 'src/common/decorator/user.decorator';

@Controller('comment')
export class CommentController {
  constructor(
    private readonly commentService: CommentService,
    private readonly postService: PostService,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  // @UseInterceptors(GrpcToHttpInterceptor)
  @Get()
  getAllCommentById(@Query('post_id') postId: string) {
    return this.commentService.getAllCommentById(postId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async addCommentToPost(
    @CurrentUser() author: User,
    @Body() addCommentToPostDto: AddCommentToPostDto,
  ) {
    try {
      addCommentToPostDto.authorId = author._id.toString();
      // increase comment count of post by 1
      await this.postService.postCommentByPostId({
        postId: addCommentToPostDto.postId,
      });
      return await this.commentService.addCommentToPost(addCommentToPostDto);
    } catch (error) {
      console.log(error);
    }
  }
}
