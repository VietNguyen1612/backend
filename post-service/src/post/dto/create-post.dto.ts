import { IsNotEmpty, IsOptional } from 'class-validator';
// import { User } from 'src/common/schemas/user.schema';

export class CreatePostDto {
  @IsNotEmpty()
  content: string;
  @IsOptional()
  assests: string[];
  @IsNotEmpty()
  authorId: string;
}
