import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { User } from '../model/user.model';

export const CurrentUser = createParamDecorator(
  (data: keyof User, ctx: ExecutionContext) => {
    const { user } = ctx.switchToHttp().getRequest<Request>();
    // if @CurrentUser('username')
    return data ? user[data] : user;
  },
);
