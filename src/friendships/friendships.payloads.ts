import { Field, ObjectType } from '@nestjs/graphql';
import { FriendshipModel } from './models/friendship.model';

@ObjectType()
export class CreateFriendshipPayload {
  @Field(() => FriendshipModel, { nullable: true })
  friendship?: FriendshipModel;

  @Field({ nullable: true })
  problem?: string;
}
