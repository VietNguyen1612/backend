import { IsNotEmpty } from 'class-validator';

export class FriendDto {
  requester: string;
  @IsNotEmpty()
  recipient: string;
}
