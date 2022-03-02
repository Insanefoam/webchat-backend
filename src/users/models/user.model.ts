import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('User')
export class UserModel {
  @Field()
  id: string;

  @Field()
  nickname: string;

  @Field()
  avatar: string;
}
