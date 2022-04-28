import { Field, ObjectType } from '@nestjs/graphql';
import { FriendshipStatus } from '../common/friendships.types';
import { FriendshipEntity } from '../entities/friendship.entity';
import { FriendModel } from './friend.model';

@ObjectType('Friendship')
export class FriendshipModel {
  constructor(entity: FriendshipEntity) {
    Object.assign(this, entity);
    this.friendId = entity.friendId;
  }

  @Field()
  id: string;

  @Field(() => FriendModel)
  friend: FriendModel;

  @Field()
  friendId: string;

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
