/**
 * This file is auto-generated by nestjs-proto-gen-ts
 */

import { Observable } from 'rxjs';
import { Metadata } from '@grpc/grpc-js';
import { Post } from './model/post.model';

export default interface PostInterface {
  getAllPost(
    data: GetAllPostRequest,
    metadata?: Metadata,
    ...rest: any[]
  ): Observable<GetAllPostResponse>;
  createPost(
    data: CreatePostRequest,
    metadata?: Metadata,
    ...rest: any[]
  ): Observable<CreatePostResponse>;
  postCommentByPostId(
    data: PostCommentByPostIdRequest,
    metadata?: Metadata,
    ...rest: any[]
  ): Observable<PostCommentByPostIdResponse>;
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

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface PostCommentByPostIdResponse { }
