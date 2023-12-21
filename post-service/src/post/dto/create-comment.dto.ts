import { IsNotEmpty } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  post_id: string;
  @IsNotEmpty()
  description: string;
}
