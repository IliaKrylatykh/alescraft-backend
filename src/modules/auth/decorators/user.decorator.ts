import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '@prisma/client';

export const CurrentUser = createParamDecorator(
  (
    data: keyof User | undefined,
    ctx: ExecutionContext,
  ): User | User[keyof User] | null => {
    const request = ctx.switchToHttp().getRequest();
    const user: User | null = request.user || null;

    if (!user) return null;

    return data ? user[data] : user;
  },
);
