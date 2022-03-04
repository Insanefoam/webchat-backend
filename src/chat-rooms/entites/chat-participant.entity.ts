import { Model, RelationMappings } from 'objection';
import { BaseEntity } from 'src/common/entities/base.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { ChatRoomEntity } from './chat-room.entity';

export class ChatParticipantEntity extends BaseEntity {
  static tableName = 'chat_participants';

  id: string;

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
