import { Model, RelationMappings } from 'objection';
import { BaseUUIDEntity } from 'src/common/entities/base-uuid.entity';
import { ChatParticipantEntity } from './chat-participant.entity';

export class ChatRoomEntity extends BaseUUIDEntity {
  static tableName = 'chat_rooms';

  participants?: ChatParticipantEntity[];

  static get relationMappings(): RelationMappings {
    return {
      participants: {
        relation: Model.HasManyRelation,
        modelClass: ChatParticipantEntity,
        join: {
          from: `${this.tableName}.id`,
          to: `${ChatParticipantEntity.tableName}.chatRoomId`,
        },
      },
    };
  }
}
