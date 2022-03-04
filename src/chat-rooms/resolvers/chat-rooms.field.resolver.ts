import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { ChatParticipantEntity } from '../entites/chat-participant.entity';
import { ChatParticipantModel } from '../models/chat-participant.model';
import { ChatRoomModel } from '../models/chat-room.model';

@Resolver(() => ChatRoomModel)
export class ChatRoomsFieldResolver {
  @ResolveField(() => [ChatParticipantModel], { name: 'participants' })
  async resolveParticipants(
    @Parent() parent: ChatRoomModel,
  ): Promise<ChatParticipantModel[]> {
    const data = await ChatParticipantEntity.query().where({
      chatRoomId: parent.id,
    });

    return ChatParticipantModel.createFromEntity(data);
  }
}
