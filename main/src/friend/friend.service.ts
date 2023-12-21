import { Injectable } from '@nestjs/common';
import { ChatService } from 'src/chat/chat.service';
import { FriendRepository } from 'src/common/repository/friend.repository';
import { FriendDto } from './dto/make-friend.dto';
import { ChatRepository } from 'src/common/repository/message.repository';
@Injectable()
export class FriendService {
  constructor(
    private readonly friendRepository: FriendRepository,
    private readonly chatRepository: ChatRepository,
    private readonly chatService: ChatService
  ) { }
  async makeFriend({ requester, recipient }: FriendDto) {
    await this.chatService.createNewRoom(requester.concat(recipient));
    await this.chatRepository.joinRoom(requester.concat(recipient), requester)
    await this.chatRepository.joinRoom(requester.concat(recipient), recipient)
    return await this.friendRepository.makeFriend(requester, recipient);
  }

  async sendFriendRequest({ requester, recipient }: FriendDto) {
    const friendRequestedList = await this.friendRepository.findByRecipient(
      requester,
    );
    const foundedRequest = friendRequestedList.find(
      (req) => req.requester.toString() === recipient,
    );
    if (foundedRequest)
      return await this.friendRepository.makeFriend(recipient, requester);
    else
      return await this.friendRepository.sendFriendRequest(
        requester,
        recipient,
      );
  }

  async rejectFriend({ requester, recipient }: FriendDto) {
    return await this.friendRepository.rejectFriend(requester, recipient);
  }

  async removeFriend({ requester, recipient }: FriendDto) {
    return await this.friendRepository.removeFriend(requester, recipient);
  }

  async getAllFriendRequestByUserId(recipient: string) {
    return await this.friendRepository.getAllFriendRequest(recipient);
  }
}
