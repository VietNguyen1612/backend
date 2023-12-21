import { Exclude } from 'class-transformer';

export class UserEntity {
  avatarUrl: string;
  username: string;
  @Exclude()
  password: string;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
