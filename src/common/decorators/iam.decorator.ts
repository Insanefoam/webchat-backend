import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { FastifyRequest } from 'fastify';

export const IAM = createParamDecorator(
  (field: string, ctx: ExecutionContext) => {
    const gqlContext = GqlExecutionContext.create(ctx);

    const req = gqlContext.getContext().req as FastifyRequest;

    return field ? req.user[field] : req.user;
  },
);
