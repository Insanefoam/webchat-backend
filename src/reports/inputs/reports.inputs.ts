import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class SendReportInput {
  @Field()
  userId: string;

  @Field()
  content: string;
}
