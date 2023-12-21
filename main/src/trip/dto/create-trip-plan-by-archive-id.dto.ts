import { IsNotEmpty } from 'class-validator';
import { Participates } from 'src/common/types/trip';

export class CreateTripPlanByArchiveIdDto {
  author: Participates;
  @IsNotEmpty()
  title: string;
  archiveId: string;
  participates: Participates[];
}
