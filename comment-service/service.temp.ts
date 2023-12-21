// import { UpdateCommentDto } from './dto/update-comment.dto';
// import {
//   PostNotFoundException,
//   PostIsNotValidException,
// } from './../common/exception/post/index';
// import { PostRepository } from './../common/repository/post.repository';
// import { User } from 'src/common/schemas/user.schema';
// import { CommentRepository } from './../common/repository/comment.repository';
// import { HttpStatus, Injectable } from '@nestjs/common';
// import { Comment } from 'src/common/schemas/comment.schema';
// import { isValidObjectId } from 'mongoose';
// import {
//   CommentIsNotValidException,
//   CommentNotFoundException,
//   CommentNotPermissionException,
// } from 'src/common/exception/comment';
// @Injectable()
// export class CommentsService {
//   constructor(
//     private readonly commentRepository: CommentRepository,
//     private readonly postRepository: PostRepository,
//   ) {}
//   async commentPost(user: User, post_id: string, description: string) {
//     if (!isValidObjectId(post_id)) {
//       throw new PostIsNotValidException(post_id);
//     }
//     const post = await this.postRepository.findById(post_id);
//     if (!post) throw new PostNotFoundException(post_id);
//     return await this.commentRepository.create({
//       author: user,
//       post: post_id,
//       description,
//     });
//     // console.log(createCommentDto);
//   }
//   async deleteComment(user: User, comment_id: string) {
//     const comment = (await this.commentRepository.findById(
//       comment_id,
//     )) as Comment;
//     if (!comment) {
//       throw new CommentNotFoundException(comment_id);
//     }
//     if (comment.author._id.toString() !== user._id.toString()) {
//       throw new CommentNotPermissionException(comment_id);
//     }
//     return await this.commentRepository.deleteOne(comment_id);
//     // return await this.commentPost
//   }
//   async updateComment(
//     user: User,
//     comment_id: string,
//     updateCommentDto: UpdateCommentDto,
//   ) {
//     if (!isValidObjectId(comment_id)) {
//       throw new CommentIsNotValidException(comment_id);
//     }
//     const comment = await this.commentRepository.findById(comment_id);
//     if (!comment) {
//       throw new CommentNotFoundException(comment_id);
//     }
//     if (user._id.toString() !== comment.author._id.toString()) {
//       throw new CommentNotPermissionException(comment_id);
//     } else {
//       await this.commentRepository.findByIdAndUpdate(comment_id, {
//         description: updateCommentDto.description,
//         lastUpdated: Date.now(),
//         isUpdated: true,
//       });
//       return HttpStatus.OK;
//     }
//   }
// }
