import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { RefreshToken } from 'src/common/model/refresh-token.model';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  refreshTokens: RefreshToken[];
}
