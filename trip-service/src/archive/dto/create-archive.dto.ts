import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
export class CreateArchiveDto {
  @IsNotEmpty()
  @IsString()
  authorId: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  places: Array<string>;
}
