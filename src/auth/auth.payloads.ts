import { Field, ObjectType } from '@nestjs/graphql';
import { UserModel } from 'src/users/models/user.model';

@ObjectType()
export class SignUpPayload {
  @Field(() => UserModel, { nullable: true })
  user?: UserModel;

  @Field({ nullable: true })
  token?: string;

  @Field({ nullable: true })
  problem?: string;
}

@ObjectType()
export class SignInPayload {
  @Field(() => UserModel, { nullable: true })
  user?: UserModel;

  @Field({ nullable: true })
  token?: string;

  @Field({ nullable: true })
  problem?: string;
}
