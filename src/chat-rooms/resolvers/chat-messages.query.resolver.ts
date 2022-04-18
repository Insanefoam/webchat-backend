import { Args, Query, Resolver } from '@nestjs/graphql';
import { GetForChatFilterInput } from '../inputs/chat-messages.inputs';
import { ChatMessageModel } from '../models/chat-message.model';
import { ChatMessagesService } from '../services/chat-messages.service';

@Resolver()
export class ChatMessagesQueryResolver {
  constructor(private readonly messagesService: ChatMessagesService) {}

  @Query(() => [ChatMessageModel], { name: 'messages_getForChat' })
  async getChatMessages(
    @Args('filter') filterInput: GetForChatFilterInput,
  ): Promise<ChatMessageModel[]> {
    const entities = await this.messagesService.getByChatId(
      filterInput.chatRoomId,
      filterInput.date,
    );

    return ChatMessageModel.createFromEntity(entities);
  }
}
