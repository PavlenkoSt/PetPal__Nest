import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ObjectId } from 'mongoose';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user as ICurrentUser;
  },
);

export interface ICurrentUser {
  login: string;
  id: ObjectId;
}
