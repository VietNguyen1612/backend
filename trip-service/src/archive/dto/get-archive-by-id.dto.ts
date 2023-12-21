import { IsNotEmpty, IsString } from 'class-validator';

export class GetArchiveByIdDto {
  @IsNotEmpty()
  @IsString()
  archiveId: string;
}
