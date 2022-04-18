import { Field, ObjectType } from '@nestjs/graphql';
import { UserModel } from 'src/users/models/user.model';
import { ChatMessageEntity } from '../entites/chat-message.entity';
import { ChatRoomModel } from './chat-room.model';

@ObjectType('ChatMessage')
export class ChatMessageModel {
  constructor(entity: ChatMessageEntity) {
    Object.assign(this, entity);
  }

  @Field()
  id: string;

  @Field()
  content: string;

  @Field(() => ChatRoomModel)
  chatRoom: ChatRoomModel;

  @Field()
  chatRoomId: string;

  @Field(() => UserModel)
  sender: UserModel;

  @Field()
  senderId: string;

  @Field()
  createdAt: string;

  static createFromEntity(entity: ChatMessageEntity): ChatMessageModel;
  static createFromEntity(entities: ChatMessageEntity[]): ChatMessageModel[];
  static createFromEntity(
    entityOrEntities: ChatMessageEntity | ChatMessageEntity[],
  ): ChatMessageModel | ChatMessageModel[] {
    if (Array.isArray(entityOrEntities)) {
      return entityOrEntities.map((entity) =>
        ChatMessageModel.createFromEntity(entity),
      );
    }

    return new ChatMessageModel(entityOrEntities);
  }
}
