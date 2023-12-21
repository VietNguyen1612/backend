import { IsNotEmpty, IsOptional } from 'class-validator';

export class GetPlacesPaginateDto {
    @IsNotEmpty()
    pageSize: number;
    @IsOptional()
    lastId: string;
}