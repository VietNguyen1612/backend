import { IsNotEmpty } from 'class-validator';

export class GetCommentByPostIdDto {
  @IsNotEmpty()
  postId: string;
}
