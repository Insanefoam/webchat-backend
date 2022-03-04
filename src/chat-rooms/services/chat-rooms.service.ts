import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/users/entities/user.entity';
import { ChatParticipantEntity } from '../entites/chat-participant.entity';
import { ChatRoomEntity } from '../entites/chat-room.entity';
import { CreateChatRoomInput } from '../inputs/chat-rooms.inputs';

@Injectable()
export class ChatRoomsService {
  async createOne(
    currentUser: UserEntity,
    input: CreateChatRoomInput,
  ): Promise<ChatRoomEntity> {
    const chat = await ChatRoomEntity.query().insertGraphAndFetch({
      participants: [{ userId: input.userId }, { userId: currentUser.id }],
    });

    return chat;
  }

  async getMany(currentUser: UserEntity): Promise<ChatRoomEntity[]> {
    return await ChatRoomEntity.query().whereExists(
      ChatParticipantEntity.query()
        .where({ userId: currentUser.id })
        .whereColumn('chatRoomId', `${ChatRoomEntity.tableName}.id`),
    );
  }
}
