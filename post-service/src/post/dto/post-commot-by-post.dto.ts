import { IsNotEmpty } from 'class-validator';

export class PostCommentByPostIdDto {
  @IsNotEmpty()
  postId: string;
}
