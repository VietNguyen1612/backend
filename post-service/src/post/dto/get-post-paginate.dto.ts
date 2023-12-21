import { IsNotEmpty, IsOptional } from 'class-validator';

export class GetPostPaginateDto {
  @IsNotEmpty()
  pageSize: number;
  @IsOptional()
  lastId: string;
}
