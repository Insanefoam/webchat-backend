import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/users/entities/user.entity';
import { ChatMessageEntity } from '../entites/chat-message.entity';
import { CreateChatMessageInput } from '../inputs/chat-messages.inputs';
import { IndexChatMessagesService } from './index-chat-messages.service';

@Injectable()
export class ChatMessagesService {
  constructor(private readonly indexingService: IndexChatMessagesService) {}

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
    });

    await this.indexingService.indexMessage(message);

    return message;
  }
}
