import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { IAM } from 'src/common/decorators/iam.decorator';
import { UserEntity } from 'src/users/entities/user.entity';
import { ChatRoomModel } from '../models/chat-room.model';
import { ChatRoomsService } from '../services/chat-rooms.service';

@UseGuards(JwtAuthGuard)
@Resolver()
export class ChatRoomsQueryResolver {
  constructor(private readonly service: ChatRoomsService) {}

  @Query(() => [ChatRoomModel], { name: 'chatRooms_getMany' })
  async getMany(@IAM() iam: UserEntity): Promise<ChatRoomModel[]> {
    const data = await this.service.getMany(iam);

    return ChatRoomModel.createFromEntity(data);
  }
}
