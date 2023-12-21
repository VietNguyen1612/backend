// import { CommentRepository } from '../common/repository/comment.repository';
// import { User, UserDocument } from 'src/common/schemas/user.schema';
// import { PostRepository } from '../common/repository/post.repository';
// import { Injectable, HttpStatus } from '@nestjs/common';
// import { CreatePostDto } from './dto/create-post.dto';
// import {
//   PostIsNotValidException,
//   PostNotFoundException,
//   PostNotPermissionException,
// } from 'src/common/exception/post';
// import { isValidObjectId } from 'mongoose';
// import { UpdatePostDto } from './dto/update-post.dto';

// @Injectable()
// export class PostService {
//   constructor(
//     private readonly postRepository: PostRepository,
//     private readonly commentRepository: CommentRepository,
//   ) {}
//   // create
//   async createPost(user: User, post: CreatePostDto) {
//     return await this.postRepository.create(post);
//   }
//   // get
//   async getAllPost() {
//     const allPosts = await this.postRepository.aggregate([
//       {
//         $lookup: {
//           from: 'comments',
//           let: { post: '$_id' },
//           pipeline: [{ $match: { $expr: { $eq: ['$$post', '$post'] } } }],
//           as: 'comment_count',
//         },
//       },
//       {
//         $lookup: {
//           from: 'likes',
//           let: { post: '$_id' },
//           pipeline: [{ $match: { $expr: { $eq: ['$$post', '$post_id'] } } }],
//           as: 'like_count',
//         },
//       },
//       { $addFields: { like_count: { $size: '$like_count' } } },
//       { $addFields: { comment_count: { $size: '$comment_count' } } },
//     ]);
//     return await this.postRepository.populate(allPosts, {
//       path: 'author',
//     });
//   }
//   async getPostById(id: string) {
//     const post = await this.postRepository.aggregate([
//       {
//         $lookup: {
//           from: 'comments',
//           let: { post: '$_id' },
//           pipeline: [
//             { $match: { $expr: { $eq: ['$$post', '$post'] } } },
//             {
//               $lookup: {
//                 from: 'users',
//                 let: { author: '$author' },
//                 pipeline: [
//                   { $match: { $expr: { $eq: ['$_id', '$$author'] } } },
//                   { $project: { password: 0 } }, // exclude password field
//                 ],
//                 as: 'author',
//               },
//             },
//             {
//               $addFields: {
//                 author: { $arrayElemAt: ['$author', 0] },
//               },
//             },
//           ],
//           as: 'commentList',
//         },
//       },
//       {
//         $lookup: {
//           from: 'likes',
//           let: { post: '$_id' },
//           pipeline: [{ $match: { $expr: { $eq: ['$$post', '$post_id'] } } }],
//           as: 'like_count',
//         },
//       },
//       { $addFields: { like_count: { $size: '$like_count' } } },
//       {
//         $match: { $expr: { $eq: ['$_id', { $toObjectId: id }] } },
//       },
//     ]);

//     return {
//       ...post[0],
//     };
//   }
//   async showOwnPosts(user: UserDocument) {
//     return await this.postRepository.getByCondition({ author: user._id });
//   }
//   // delete
//   async deletePost(user: User, id: string) {
//     //
//     if (!isValidObjectId(id)) {
//       throw new PostIsNotValidException(id);
//     }
//     const post = await this.postRepository.findById(id);
//     if (!post) {
//       throw new PostNotFoundException(id);
//     }
//     if (user._id.toString() !== post.author._id.toString()) {
//       throw new PostNotPermissionException(id);
//     } else {
//       await this.postRepository.deleteOne(id);
//       await this.commentRepository.deleteByCondition({ post: id });
//       return HttpStatus.OK;
//     }
//   }
//   async updatePost(user: User, id: string, updatePostDto: UpdatePostDto) {
//     if (!isValidObjectId(id)) {
//       throw new PostIsNotValidException(id);
//     }
//     const post = await this.postRepository.findById(id);
//     if (!post) {
//       throw new PostNotFoundException(id);
//     }
//     if (user._id.toString() !== post.author._id.toString()) {
//       throw new PostNotPermissionException(id);
//     } else {
//       await this.postRepository.findByIdAndUpdate(id, {
//         content: updatePostDto.content,
//         lastUpdated: Date.now(),
//         isUpdated: true,
//       });
//       return HttpStatus.OK;
//     }
//   }
// }
