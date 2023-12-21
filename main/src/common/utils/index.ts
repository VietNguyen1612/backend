import { User } from '../model/user.model';
import * as jwt from 'jsonwebtoken';
export function hidePassword(user: User) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...restProperty } = user;
  return restProperty;
}

export function decodeToken(authToken: string) {
  return jwt.verify(authToken, process.env.JWT_SECRET_KEY);
}
