import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class GetForChatFilterInput {
  @Field()
  chatRoomId: string;

  @Field()
  date: string;
}

@InputType()
export class CreateChatMessageInput {
  @Field()
  chatRoomId: string;

  @Field()
  content: string;
}
