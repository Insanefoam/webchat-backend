import { Model, RelationMappings, RelationMappingsThunk } from 'objection';
import { BaseEntity } from 'src/common/entities/base.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { FriendshipStatus } from '../common/friendships.types';

export class FriendshipEntity extends BaseEntity {
  static tableName = 'friendships';

  id: string;

  user: UserEntity;

  userId: string;

  friend: UserEntity;

  friendId: string;

  status: FriendshipStatus;

  static get relationMappings(): RelationMappings | RelationMappingsThunk {
    return {
      user: {
        relation: Model.HasManyRelation,
        modelClass: UserEntity,
        join: {
          from: `${this.tableName}.firstUserId`,
          to: `${UserEntity.tableName}.id`,
        },
      },
      friend: {
        relation: Model.HasManyRelation,
        modelClass: UserEntity,
        join: {
          from: `${this.tableName}.secondUserId`,
          to: `${UserEntity.tableName}.id`,
        },
      },
    };
  }
}
