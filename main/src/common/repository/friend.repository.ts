import { Injectable } from '@nestjs/common';
import { BaseRepository } from './base.repository';
import { Friend, FriendDocument } from '../model/friend.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ObjectId } from 'mongodb';
import { User, UserDocument } from '../model/user.model';

// enum FriendStatus {
//   'ADD_FRIEND',
//   'REQUESTED',
//   'FRIENDS',
// }

@Injectable()
export class FriendRepository extends BaseRepository<FriendDocument> {
  constructor(
    @InjectModel(Friend.name)
    private readonly friendModel: Model<FriendDocument>,
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {
    super(friendModel);
  }
  async findByRecipient(recipient: string) {
    return await this.friendModel
      .find({
        recipient: new ObjectId(recipient),
      })
      .lean();
  }
  async makeFriend(userRequester: string, userRecipient: string) {
    await this.friendModel
      .findOneAndUpdate(
        {
          requester: new ObjectId(userRequester),
          recipient: new ObjectId(userRecipient),
        },
        {
          $set: {
            status: 2,
          },
        },
      )
      .lean();
    // push to friend list of both these use
    await this.userModel
      .findOneAndUpdate(
        {
          _id: userRequester,
        },
        { $push: { friends: userRecipient } },
      )
      .lean();
    await this.userModel
      .findOneAndUpdate(
        {
          _id: userRecipient,
        },
        {
          $push: { friends: userRequester },
        },
      )
      .lean();
  }
  async sendFriendRequest(userRequester: string, userRecipient: string) {
    return await this.friendModel
      .findOneAndUpdate(
        {
          requester: new ObjectId(userRequester),
          recipient: new ObjectId(userRecipient),
        },
        {
          $set: {
            status: 1,
          },
        },
        {
          upsert: true,
          new: true,
        },
      )
      .lean();
  }
  async rejectFriend(userRequester: string, userRecipient: string) {
    return await this.friendModel
      .findOneAndUpdate(
        {
          requester: new ObjectId(userRequester),
          recipient: new ObjectId(userRecipient),
        },
        {
          $set: {
            status: 0,
          },
        },
      )
      .lean();
  }

  async removeFriend(userRequester: string, userRecipient: string) {
    console.log(userRecipient, userRequester);
  }
  async getAllFriendRequest(recipient: string) {
    return await this.friendModel
      .find({
        recipient: new ObjectId(recipient),
        status: 1,
      })
      .lean()
      .populate('recipient')
      .populate('requester');
  }
}
