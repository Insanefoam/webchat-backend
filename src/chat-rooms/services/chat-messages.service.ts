import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/users/entities/user.entity';
import { ChatMessageEntity } from '../entities/chat-message.entity';
import { ChatParticipantEntity } from '../entities/chat-participant.entity';
import { CreateChatMessageInput } from '../inputs/chat-messages.inputs';
import { MessagesGateway } from '../sockets/messages.gateway';
import { IndexChatMessagesService } from './index-chat-messages.service';

@Injectable()
export class ChatMessagesService {
  constructor(
    private readonly indexingService: IndexChatMessagesService,
    private readonly gatewayService: MessagesGateway,
  ) {}

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

    const chatParticipants = await ChatParticipantEntity.query().where({
      chatRoomId: input.chatRoomId,
    });

    for (const participant of chatParticipants) {
      await this.gatewayService.emitNewMessage(participant.userId, message);
    }

    await this.indexingService.indexMessage(message);

    return message;
  }
}
