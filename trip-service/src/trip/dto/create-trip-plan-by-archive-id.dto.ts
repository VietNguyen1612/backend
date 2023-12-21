import { IsNotEmpty } from 'class-validator';

export class CreateTripPlanByArchiveIdDto {
    @IsNotEmpty()
    authorId: string;
    @IsNotEmpty()
    title: string;
    @IsNotEmpty()
    archiveId: string;
}
