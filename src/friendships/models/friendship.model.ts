import { Field, ObjectType } from '@nestjs/graphql';
import { UserEntity } from 'src/users/entities/user.entity';
import { UserModel } from 'src/users/models/user.model';
import { FriendshipStatus } from '../common/friendships.types';
import { FriendshipEntity } from '../entities/friendship.entity';

@ObjectType('Friendship')
export class FriendshipModel {
  constructor(entity: FriendshipEntity) {
    Object.assign(this, entity);
    this.userId = entity.friendId;
  }

  @Field()
  id: string;

  @Field(() => UserModel)
  user: UserModel;

  @Field()
  userId: string;

  @Field(() => FriendshipStatus)
  status: FriendshipStatus;

  static createFromEntity(entity: FriendshipEntity): FriendshipModel;
  static createFromEntity(entities: FriendshipEntity[]): FriendshipModel[];
  static createFromEntity(
    entityOrEntities: FriendshipEntity | FriendshipEntity[],
  ): FriendshipModel | FriendshipModel[] {
    if (Array.isArray(entityOrEntities)) {
      return entityOrEntities.map((entity) =>
        FriendshipModel.createFromEntity(entity),
      );
    }

    return new FriendshipModel(entityOrEntities);
  }
}
