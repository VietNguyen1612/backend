import { Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { FriendService } from './friend.service';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from 'src/common/decorator/user.decorator';
import { User } from 'src/common/model/user.model';

@Controller('friend')
export class FriendController {
  constructor(private readonly friendService: FriendService) {}

  @Post('make')
  @UseGuards(AuthGuard('jwt'))
  async makeFriend(
    @CurrentUser() user: User,
    @Query('requester') requester: string,
  ) {
    return await this.friendService.makeFriend({
      recipient: user._id.toString(),
      requester,
    });
  }
  @Post('send')
  @UseGuards(AuthGuard('jwt'))
  async sendFriendRequest(
    @CurrentUser() user: User,
    @Query('recipient') recipient: string,
  ) {
    return await this.friendService.sendFriendRequest({
      requester: user._id.toString(),
      recipient,
    });
  }

  @Post('reject')
  @UseGuards(AuthGuard('jwt'))
  async rejectFriend(
    @CurrentUser() user: User,
    @Query('requester') requester: string,
  ) {
    return await this.friendService.rejectFriend({
      recipient: user._id.toString(),
      requester,
    });
  }

  @Post('remove')
  @UseGuards(AuthGuard('jwt'))
  async removeFriend(
    @CurrentUser() user: User,
    @Query('recipient') recipient: string,
  ) {
    return await this.friendService.removeFriend({
      requester: user._id.toString(),
      recipient,
    });
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getAllFriendRequestByUserId(@CurrentUser() user: User) {
    return await this.friendService.getAllFriendRequestByUserId(
      user._id.toString(),
    );
  }
}
