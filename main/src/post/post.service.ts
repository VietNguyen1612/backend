import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import PostInterface, { GetAllPostRequest } from './post.interface';
import { PostCommentByPostIdDto } from './dto/post-commot-by-post.dto';

@Injectable()
export class PostService {
  private grpcService: PostInterface;
  constructor(@Inject('POST_SERVICE') private readonly client: ClientGrpc) {}

  onModuleInit() {
    this.grpcService = this.client.getService<PostInterface>('PostService');
  }
  async getAllPost(pageSize: number, lastId: string) {
    const getAllPostRequest: GetAllPostRequest = {
      pageSize,
      lastId,
    };
    return await this.grpcService.getAllPost(getAllPostRequest);
  }

  async createPost(authorId: string, content: string) {
    return await this.grpcService.createPost({
      authorId,
      content,
    });
  }
  async postCommentByPostId(postCommentByPostIdDto: PostCommentByPostIdDto) {
    return await this.grpcService.postCommentByPostId({
      postId: postCommentByPostIdDto.postId,
    });
  }

  async likePost(postId: string, userId: string) {
    return await this.grpcService.postReaction({
      postId,
      userId,
    });
  }
}
