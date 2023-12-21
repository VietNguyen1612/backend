import { BaseRepository } from '../utils/base.repository';
import { Post, PostDocument } from './model/post.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

@Injectable()
export class PostRepository extends BaseRepository<PostDocument> {
  constructor(
    @InjectModel(Post.name) private readonly postModel: Model<PostDocument>,
  ) {
    super(postModel);
  }
  async increaseCommentInPost(postId: string) {
    const post = await this.findById(postId);
    return await post
      .updateOne({
        _id: postId,
        $inc: {
          commentCount: 1,
        },
      })
      .lean();
  }
  async findAllPostLimit(pageSize: number, lastId: string = null) {
    const lastIdFormat = new Types.ObjectId(lastId);
    let postList: any;
    if (!lastId) {
      postList = (await this.postModel.find().limit(pageSize).lean()) as Post[];
    } else {
      postList = (await this.postModel
        .find({ _id: { $gt: lastIdFormat } })
        .limit(pageSize)
        .lean()) as Post[];
    }

    const last_id: string = postList[postList.length - 1]?._id;
    return {
      data: postList,
      lastId: last_id,
    };
  }

  async increaseLikeInPost(postId: string, userId:string) {
    const post = await this.findById(postId);
    if(post.likedBy.includes(userId)){
      throw new Error('You already liked this post');
    }
    return await post
      .updateOne({
        _id: postId,
        $push:{
          likedBy:userId
        },
        $inc: {
          reactionCount: 1,
        },
      })
      .lean();
  }

}
