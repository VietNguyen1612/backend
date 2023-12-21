import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './model/post.model';
import { GetAllPostResponse } from './post.interface';
import { PostRepository } from './post.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PostService {
  constructor(private readonly postRepository: PostRepository) {}
  async getAllPost(): Promise<Post[]> {
    return await this.postRepository.findAll();
  }
  async getAllPostPaginate(
    pageSize: number,
    lastId: string,
  ): Promise<GetAllPostResponse> {
    return await this.postRepository.findAllPostLimit(pageSize, lastId);
  }
  async createPost(post: CreatePostDto): Promise<Post> {
    return await this.postRepository.create(post);
  }
  async getPostById(postId: string): Promise<Post> {
    return await this.postRepository.findById(postId);
  }
  async postCommentByPostId(postId: string): Promise<void> {
    await this.postRepository.increaseCommentInPost(postId);
  }
  async postReaction(postId: string, userId: string): Promise<void> {
    await this.postRepository.increaseLikeInPost(postId,userId);
  }
}
