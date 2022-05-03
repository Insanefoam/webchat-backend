import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql';
import { FastifyRequest } from 'fastify';
import { Socket } from 'socket.io';
import { UserEntity } from 'src/users/entities/user.entity';

export const IAM = createParamDecorator(
  (field: string, ctx: ExecutionContext) => {
    let user: UserEntity;

    if (ctx.getType() === 'ws') {
      const wsContext = ctx.switchToWs();

      const req = wsContext.getClient<Socket>().request;

      user = req.user;
    }

    if (ctx.getType<GqlContextType>() === 'graphql') {
      const gqlContext = GqlExecutionContext.create(ctx);
      const req = gqlContext.getContext().req as FastifyRequest;

      user = req.user;
    }

    return field ? user[field] : user;
  },
);
