import { IsNotEmpty } from 'class-validator';

export class AddCommentToPostDto {
  @IsNotEmpty()
  postId: string;
  @IsNotEmpty()
  content: string;
}
