import { Model, RelationMappings } from 'objection';
import { BaseUUIDEntity } from 'src/common/entities/base-uuid.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { ChatRoomEntity } from './chat-room.entity';

export class ChatParticipantEntity extends BaseUUIDEntity {
  static tableName = 'chat_participants';

  chatRoom: ChatRoomEntity;

  chatRoomId: ChatRoomEntity['id'];

  user: UserEntity;

  userId: UserEntity['id'];

  static get relationMappings(): RelationMappings {
    return {
      chatRoom: {
        relation: Model.HasManyRelation,
        modelClass: ChatRoomEntity,
        join: {
          from: `${this.tableName}.chatRoomId`,
          to: `${ChatRoomEntity.tableName}.id`,
        },
      },
      user: {
        relation: Model.HasManyRelation,
        modelClass: UserEntity,
        join: {
          from: `${this.tableName}.userId`,
          to: `${UserEntity.tableName}.id`,
        },
      },
    };
  }
}
