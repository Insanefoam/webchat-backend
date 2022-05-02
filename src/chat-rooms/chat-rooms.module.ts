import { Module } from '@nestjs/common';
import { ElasticModule } from 'src/common/modules/elastic.module';
import { ChatMessagesMutationResolver } from './resolvers/chat-messages.mutation.resolver';
import { ChatMessagesQueryResolver } from './resolvers/chat-messages.query.resolver';
import { ChatParticipantsFieldResolver } from './resolvers/chat-participants.field.resolver';
import { ChatRoomsFieldResolver } from './resolvers/chat-rooms.field.resolver';
import { ChatRoomsMutationResolver } from './resolvers/chat-rooms.mutation.resolver';
import { ChatRoomsQueryResolver } from './resolvers/chat-rooms.query.resolver';
import { ChatMessagesService } from './services/chat-messages.service';
import { ChatRoomsService } from './services/chat-rooms.service';
import { IndexChatMessagesService } from './services/index-chat-messages.service';
import { SearchChatMessagesService } from './services/search-chat-messages.service';

@Module({
  imports: [ElasticModule],
  providers: [
    ChatRoomsMutationResolver,
    ChatRoomsQueryResolver,
    ChatRoomsFieldResolver,
    ChatRoomsService,
    ChatParticipantsFieldResolver,
    ChatMessagesQueryResolver,
    ChatMessagesService,
    ChatMessagesMutationResolver,
    SearchChatMessagesService,
    IndexChatMessagesService,
  ],
})
export class ChatRoomsModule {}
