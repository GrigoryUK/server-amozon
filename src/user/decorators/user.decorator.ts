import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '@prisma/client';

type TypeData = keyof User;
export const currentUser = createParamDecorator(
  (data: TypeData, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    return data ? user[data] : user;
  },
);
