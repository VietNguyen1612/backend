import { IsNotEmpty, IsOptional } from 'class-validator';

export class AddCommentToPostDto {
  @IsNotEmpty()
  postId: string;
  @IsOptional()
  authorId: string;
  @IsNotEmpty()
  content: string;
}
