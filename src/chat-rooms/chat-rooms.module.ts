import { Module } from '@nestjs/common';
import { ChatParticipantsFieldResolver } from './resolvers/chat-participants.field.resolver';
import { ChatRoomsFieldResolver } from './resolvers/chat-rooms.field.resolver';
import { ChatRoomsMutationResolver } from './resolvers/chat-rooms.mutation.resolver';
import { ChatRoomsQueryResolver } from './resolvers/chat-rooms.query.resolver';
import { ChatRoomsService } from './services/chat-rooms.service';

@Module({
  providers: [
    ChatRoomsMutationResolver,
    ChatRoomsQueryResolver,
    ChatRoomsFieldResolver,
    ChatRoomsService,
    ChatParticipantsFieldResolver,
  ],
})
export class ChatRoomsModule {}
