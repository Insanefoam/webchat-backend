import { ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { FastifyRequest } from 'fastify';

export class JwtAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext): FastifyRequest {
    const ctx = GqlExecutionContext.create(context);

    return ctx.getContext().req;
  }
}
