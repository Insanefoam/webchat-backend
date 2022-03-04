import { Field, ObjectType } from '@nestjs/graphql';
import { UserModel } from 'src/users/models/user.model';
import { FriendshipStatus } from '../common/friendships.types';
import { FriendshipEntity } from '../entities/friendship.entity';

@ObjectType('Friendship')
export class FriendshipModel {
  constructor(entity: FriendshipEntity) {
    this.id = entity.id;
    this.firstUser = entity.firstUser;
    this.firstUserId = entity.firstUserId;
    this.secondUser = entity.secondUser;
    this.secondUserId = entity.secondUserId;
    this.status = entity.status;
  }

  @Field()
  id: string;

  @Field(() => UserModel)
  firstUser: UserModel;

  @Field()
  firstUserId: string;

  @Field(() => UserModel)
  secondUser: UserModel;

  @Field()
  secondUserId: string;

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
