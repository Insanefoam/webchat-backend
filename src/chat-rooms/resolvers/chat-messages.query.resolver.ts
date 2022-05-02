import { Args, Query, Resolver } from '@nestjs/graphql';
import {
  FindMessagesHitsInput,
  GetForChatFilterInput,
} from '../inputs/chat-messages.inputs';
import { ChatMessageModel } from '../models/chat-message.model';
import { ChatMessagesService } from '../services/chat-messages.service';
import { SearchChatMessagesService } from '../services/search-chat-messages.service';

@Resolver()
export class ChatMessagesQueryResolver {
  constructor(
    private readonly messagesService: ChatMessagesService,
    private readonly searchMessagesService: SearchChatMessagesService,
  ) {}

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

  @Query(() => [ChatMessageModel], { name: 'messages_findMessagesHits' })
  async findMessagesHits(
    @Args('filter') input: FindMessagesHitsInput,
  ): Promise<ChatMessageModel[]> {
    const entities = await this.searchMessagesService.getHits({
      content: input.content,
    });

    return ChatMessageModel.createFromEntity(entities);
  }
}
