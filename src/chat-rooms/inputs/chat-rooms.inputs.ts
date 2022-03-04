import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateChatRoomInput {
  @Field()
  userId: string;
}
