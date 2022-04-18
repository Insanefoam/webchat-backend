import { Field, ObjectType } from '@nestjs/graphql';
import { ChatRoomEntity } from '../entites/chat-room.entity';
import { ChatParticipantModel } from './chat-participant.model';

@ObjectType('ChatRoom')
export class ChatRoomModel {
  constructor(entity: ChatRoomEntity) {
    Object.assign(this, entity);
  }

  @Field()
  id: string;

  @Field(() => [ChatParticipantModel], { nullable: true })
  participants?: ChatParticipantModel[];

  static createFromEntity(entity: ChatRoomEntity): ChatRoomModel;
  static createFromEntity(entities: ChatRoomEntity[]): ChatRoomModel[];
  static createFromEntity(
    entityOrEntities: ChatRoomEntity | ChatRoomEntity[],
  ): ChatRoomModel | ChatRoomModel[] {
    if (Array.isArray(entityOrEntities)) {
      return entityOrEntities.map((entity) =>
        ChatRoomModel.createFromEntity(entity),
      );
    }

    return new ChatRoomModel(entityOrEntities);
  }
}
