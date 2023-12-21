import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
export class CreateArchiveDto {
  @IsNotEmpty()
  title: string;
  places: Array<string>;
}
