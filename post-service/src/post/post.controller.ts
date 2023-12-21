import { Controller } from '@nestjs/common';
import { PostService } from './post.service';
import { GrpcMethod } from '@nestjs/microservices';
import { CreatePostDto } from './dto/create-post.dto';
import { PostCantBeCreateException } from './exception';
import { GetPostPaginateDto } from './dto/get-post-paginate.dto';
import { GetPostByIdDto } from './dto/get-post-by-id.dto';
import { PostCommentByPostIdDto } from './dto/post-commot-by-post.dto';
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) { }

  @GrpcMethod('PostService', 'getAllPost')
  async getAllPost(getPostPaginateDto: GetPostPaginateDto) {
    const { pageSize, lastId } = getPostPaginateDto;
    const allPost = await this.postService.getAllPostPaginate(
      Number(pageSize),
      lastId,
    );

    return allPost;
  }

  @GrpcMethod('PostService', 'createPost')
  async createPost(createPostDto: CreatePostDto) {
    try {
      await this.postService.createPost(createPostDto);
      return {
        status: 201,
        message: 'Post created successfully',
      };
    } catch (error) {
      const exception = new PostCantBeCreateException();
      return {
        status: exception.getStatus(),
        message: error.message,
      };
    }
  }
  // @UseGuards(AuthGuard('jwt'))
  // @Get('own')
  // async showOwnPosts(@Req() req: Request) {
  //   return await this.postService.showOwnPosts(req.user as UserDocument);
  // }

  @GrpcMethod('PostService', 'getPostById')
  async getPostById(getPostByIdDto: GetPostByIdDto) {
    return await this.postService.getPostById(getPostByIdDto.postId);
  }

  @GrpcMethod('PostService', 'postCommentByPostId')
  async postCommentByPostId(postCommentByPostIdDto: PostCommentByPostIdDto) {
    console.log('post service recived');
    try{
      await this.postService.postCommentByPostId(postCommentByPostIdDto.postId);
      return {
        status: 201,
        message: 'Post comment successfully',
      };
    }catch(error){
      return {
        status: 400,
        message: error.message,
      };
    }
  }

  // // @UseGuards(AuthGuard('jwt'))
  // @Delete(':id')
  // async deletePostById(@Req() req: Request, @Param('id') id: string) {
  //   return await this.postService.deletePost(req.user as User, id);
  // }
  // // @UseGuards(AuthGuard('jwt'))
  // @Patch(':id')
  // async updatePostById(
  //   @Req() req: Request,
  //   @Param('id') id: string,
  //   @Body() updatePostDto: UpdatePostDto,
  // ) {
  //   return await this.postService.updatePost(
  //     req.user as User,
  //     id,
  //     updatePostDto,
  //   );
  // }
  // // @UseGuards(AuthGuard('jwt'))
  // // @Get('user/all')
  // // async getPostUser(@Req() req: Request) {
  // //   const user = req.user as UserDocument;
  // //   await user.populate('posts');
  // //   return user.posts;
  // // }
  @GrpcMethod('PostService', 'postReaction')
  async postReaction(getPostByIdDto: GetPostByIdDto) {
    try{
      await this.postService.postReaction(getPostByIdDto.postId, getPostByIdDto.userId);
      return {
        status: 201,
        message: 'Post reaction successfully',
      };
    }
    catch(error){
      return {
        status: 400,
        message: error.message,
      };
    }
  }
}
