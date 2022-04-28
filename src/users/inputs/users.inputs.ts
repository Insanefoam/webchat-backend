import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateProfileInput {
  @Field({ nullable: true })
  nickname?: string;

  @Field({ nullable: true })
  avatarUrl?: string;
}
