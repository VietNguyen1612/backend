import { PostService } from './post.service';
import { AuthGuard } from '@nestjs/passport';
import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { User } from 'src/common/model/user.model';
import { CurrentUser } from 'src/common/decorator/user.decorator';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}
  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getAllPost(
    @Query('pageSize') pageSize: number,
    @Query('lastId') lastId: string,
  ) {
    return await this.postService.getAllPost(pageSize, lastId);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async createPost(
    @CurrentUser() author: User,
    @Body() createPostDto: CreatePostDto,
  ) {
    return await this.postService.createPost(
      author._id.toString(),
      createPostDto.content,
    );
  }

  @Post('like')
  @UseGuards(AuthGuard('jwt'))
  async likePost(@CurrentUser() userId: User, @Body('postId') postId: string) {
    return await this.postService.likePost(postId, userId._id.toString());
  }
}
