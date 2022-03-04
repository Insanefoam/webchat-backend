import { Model, RelationMappings } from 'objection';
import { BaseEntity } from 'src/common/entities/base.entity';
import { ChatParticipantEntity } from './chat-participant.entity';

export class ChatRoomEntity extends BaseEntity {
  static tableName = 'chat_rooms';

  id: string;

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
