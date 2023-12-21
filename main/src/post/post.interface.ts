import { Metadata } from '@grpc/grpc-js';
import { Post } from 'src/common/types/post';
export default interface PostInterface {
  getAllPost(
    data: GetAllPostRequest,
    metadata?: Metadata,
    ...rest: any[]
  ): Promise<GetAllPostResponse>;
  createPost(
    data: CreatePostRequest,
    metadata?: Metadata,
    ...rest: any[]
  ): Promise<CreatePostResponse>;
  postCommentByPostId(
    data: PostCommentByPostIdRequest,
    metadata?: Metadata,
    ...rest: any[]
  ): Promise<PostCommentByPostIdResponse>;
  postReaction(
    data: LikePostRequest,
    metadata?: Metadata,
    ...rest: any[]
  ): Promise<LikePostResponse>;
}
// tslint:disable-next-line:no-empty-interface
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface GetAllPostRequest {
  pageSize: number;
  lastId: string;
}
export interface GetAllPostResponse {
  data: Post[];
  lastId: string;
}

export interface CreatePostRequest {
  authorId: string;
  content: string;
}
export interface CreatePostResponse {
  status: number;
  message: string;
}

export interface GetPostByIdRequest {
  postId: string;
}

export interface GetPostByIdResponse {
  data?: any;
}

export interface PostCommentByPostIdRequest {
  postId: string;
}

export interface LikePostRequest {
  postId: string;
  userId: string;
}

export interface LikePostResponse {
  status: number;
  message: string;
}
export interface PostCommentByPostIdResponse {
  status: number;
  message: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
