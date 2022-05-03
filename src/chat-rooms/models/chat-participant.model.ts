import { Field, ObjectType } from '@nestjs/graphql';
import { UserModel } from 'src/users/models/user.model';
import { ChatParticipantEntity } from '../entities/chat-participant.entity';
import { ChatRoomModel } from './chat-room.model';

@ObjectType('ChatParticipant')
export class ChatParticipantModel {
  constructor(entity: ChatParticipantEntity) {
    Object.assign(this, entity);
  }

  @Field()
  id: string;

  @Field(() => ChatRoomModel)
  chatRoom: ChatRoomModel;

  @Field()
  chatRoomId: string;

  @Field(() => UserModel)
  user: UserModel;

  @Field()
  userId: string;

  static createFromEntity(entity: ChatParticipantEntity): ChatParticipantModel;
  static createFromEntity(
    entities: ChatParticipantEntity[],
  ): ChatParticipantModel[];
  static createFromEntity(
    entityOrEntities: ChatParticipantEntity | ChatParticipantEntity[],
  ): ChatParticipantModel | ChatParticipantModel[] {
    if (Array.isArray(entityOrEntities)) {
      return entityOrEntities.map((entity) =>
        ChatParticipantModel.createFromEntity(entity),
      );
    }

    return new ChatParticipantModel(entityOrEntities);
  }
}
