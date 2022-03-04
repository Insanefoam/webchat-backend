import { CanActivate, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { FastifyRequest } from 'fastify';
import { FriendshipEntity } from '../entities/friendship.entity';

export class IsUserFriendshipOwnerGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const gqlContext = GqlExecutionContext.create(context);

    const req = gqlContext.getContext().req as FastifyRequest;

    const user = req.user;
    const { input } = gqlContext.getArgByIndex(1) as {
      input: { friendshipId: string };
    };

    const isUserInFriendship = await FriendshipEntity.query()
      .where({
        id: input.friendshipId,
        firstUserId: user.id,
      })
      .orWhere({ id: input.friendshipId, secondUserId: user.id })
      .resultSize();

    return Boolean(isUserInFriendship);
  }
}
