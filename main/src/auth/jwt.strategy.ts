import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'src/common/model/user.model';
import { InvalidTokenException } from 'src/common/exception/auth';
import { UserIsNotActiveException } from 'src/common/exception/user';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: `${process.env.JWT_SECRET_KEY}`,
    });
  }

  async validate({ username }: { username: string }): Promise<User> {
    const user = await this.authService.validateUser(username);
    if (!user) {
      throw new InvalidTokenException();
    }

    if (!user.isActive) {
      throw new UserIsNotActiveException();
    }

    return user;
  }
}
