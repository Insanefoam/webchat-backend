import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/users/entities/user.entity';
import { ChatMessageEntity } from '../entites/chat-message.entity';
import { CreateChatMessageInput } from '../inputs/chat-messages.inputs';

@Injectable()
export class ChatMessagesService {
  async getByChatId(
    chatRoomId: ChatMessageEntity['chatRoomId'],
    date: ChatMessageEntity['date'],
  ): Promise<ChatMessageEntity[]> {
    const messages = await ChatMessageEntity.findByChatAndDate(
      chatRoomId,
      date,
    );

    return messages;
  }

  async createChatMessage(
    input: CreateChatMessageInput,
    userId: UserEntity['id'],
  ): Promise<ChatMessageEntity> {
    const message = await ChatMessageEntity.createOne({
      ...input,
      senderId: userId,
      createdAt: new Date().toISOString(),
      date: `${new Date().getFullYear()}.${new Date().getMonth()}`,
    });

    return message;
  }
}
