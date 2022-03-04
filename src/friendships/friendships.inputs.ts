import { Field, InputType } from '@nestjs/graphql';
import { FriendshipStatus } from './common/friendships.types';

@InputType()
export class CreateFriendshipInput {
  @Field()
  userId: string;
}

@InputType()
export class UpdateFriendshipStatusInput {
  @Field()
  friendshipId: string;

  @Field(() => FriendshipStatus)
  status: FriendshipStatus;
}
