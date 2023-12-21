import { IsNotEmpty } from 'class-validator';

export class CreateChatDto {
  @IsNotEmpty()
  userId: string;
  @IsNotEmpty()
  message: string;
  @IsNotEmpty()
  room: string | string[];
  time: Date;
}
