import { Model, RelationMappings, RelationMappingsThunk } from 'objection';
import { BaseEntity } from 'src/common/entities/base.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { FriendshipStatus } from '../common/friendships.types';

export class FriendshipEntity extends BaseEntity {
  static tableName = 'friendships';

  id: string;

  firstUser: UserEntity;

  firstUserId: string;

  secondUser: UserEntity;

  secondUserId: string;

  status: FriendshipStatus;

  static get relationMappings(): RelationMappings | RelationMappingsThunk {
    return {
      firstUser: {
        relation: Model.HasManyRelation,
        modelClass: UserEntity,
        join: {
          from: `${this.tableName}.firstUserId`,
          to: `${UserEntity.tableName}.id`,
        },
      },
      secondUser: {
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
