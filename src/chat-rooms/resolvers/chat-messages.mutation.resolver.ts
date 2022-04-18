import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { IAM } from 'src/common/decorators/iam.decorator';
import { UserEntity } from 'src/users/entities/user.entity';
import { CreateChatMessageInput } from '../inputs/chat-messages.inputs';
import { ChatMessageModel } from '../models/chat-message.model';
import { ChatMessagesService } from '../services/chat-messages.service';

@UseGuards(JwtAuthGuard)
@Resolver()
export class ChatMessagesMutationResolver {
  constructor(private readonly messagesService: ChatMessagesService) {}

  @Mutation(() => ChatMessageModel, { name: 'messages_createChatMessage' })
  async createChatMessage(
    @Args('input') input: CreateChatMessageInput,
    @IAM() iam: UserEntity,
  ): Promise<ChatMessageModel> {
    const entity = await this.messagesService.createChatMessage(input, iam.id);

    return ChatMessageModel.createFromEntity(entity);
  }
}
