import { Module } from '@nestjs/common';
import { FriendshipsFieldResolver } from './resolvers/friendships.field.resolver';
import { FriendshipsMutationResolver } from './resolvers/friendships.mutation.resolver';
import { FriendshipsQueryResolver } from './resolvers/friendships.query.resolver';
import { FriendshipsService } from './services/friendships.service';

@Module({
  providers: [
    FriendshipsMutationResolver,
    FriendshipsQueryResolver,
    FriendshipsFieldResolver,
    FriendshipsService,
  ],
})
export class FriendshipsModule {}
