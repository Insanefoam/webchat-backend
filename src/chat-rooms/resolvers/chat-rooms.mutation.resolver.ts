import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { IAM } from 'src/common/decorators/iam.decorator';
import { UserEntity } from 'src/users/entities/user.entity';
import { CreateChatRoomInput } from '../inputs/chat-rooms.inputs';
import { ChatRoomModel } from '../models/chat-room.model';
import { ChatRoomsService } from '../services/chat-rooms.service';

@UseGuards(JwtAuthGuard)
@Resolver()
export class ChatRoomsMutationResolver {
  constructor(private readonly service: ChatRoomsService) {}

  @Mutation(() => ChatRoomModel, { name: 'chatRooms_createOne' })
  async createOne(
    @Args('input') input: CreateChatRoomInput,
    @IAM() iam: UserEntity,
  ): Promise<ChatRoomModel> {
    const data = await this.service.createOne(iam, input);

    return ChatRoomModel.createFromEntity(data);
  }
}
