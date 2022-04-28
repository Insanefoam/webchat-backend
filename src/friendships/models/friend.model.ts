import { Field, ObjectType } from '@nestjs/graphql';
import { UserModel } from 'src/users/models/user.model';

@ObjectType('Friend')
export class FriendModel extends UserModel {
  @Field(() => [UserModel], { nullable: true })
  commonFriends?: UserModel[];
}
