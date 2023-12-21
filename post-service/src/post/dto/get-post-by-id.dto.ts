import { IsNotEmpty } from 'class-validator';

export class GetPostByIdDto {
  @IsNotEmpty()
  postId: string;
  @IsNotEmpty()
  userId: string;
}
