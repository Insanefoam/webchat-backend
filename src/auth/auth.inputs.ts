import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class SignUpInput {
  @Field()
  username: string;

  @Field()
  password: string;
}

@InputType()
export class SignInInput {
  @Field()
  username: string;

  @Field()
  password: string;
}
