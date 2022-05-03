import { Field, ObjectType } from '@nestjs/graphql';
import { UserModel } from 'src/users/models/user.model';
import { RouletteSessionMatchEntity } from '../entities/roulette-session-match.entity';
import { RouletteSessionModel } from './roulette-session.model';

@ObjectType('RouletteSessionMatch')
export class RouletteSessionMatchModel {
  constructor(entity: RouletteSessionMatchEntity) {
    Object.assign(this, entity);
  }

  @Field()
  id: string;

  @Field(() => RouletteSessionModel)
  session: RouletteSessionModel;

  @Field()
  sessionId: string;

  @Field(() => UserModel)
  companion: UserModel;

  @Field()
  companionId: string;

  @Field()
  startedAt: string;

  @Field({ nullable: true })
  endedAt?: string;

  static createFromEntity(
    entity: RouletteSessionMatchEntity,
  ): RouletteSessionMatchModel;
  static createFromEntity(
    entities: RouletteSessionMatchEntity[],
  ): RouletteSessionMatchModel[];
  static createFromEntity(
    entityOrEntities: RouletteSessionMatchEntity | RouletteSessionMatchEntity[],
  ): RouletteSessionMatchModel | RouletteSessionMatchModel[] {
    if (Array.isArray(entityOrEntities)) {
      return entityOrEntities.map<RouletteSessionMatchModel>(
        RouletteSessionMatchModel.createFromEntity,
      );
    }

    return new RouletteSessionMatchModel(entityOrEntities);
  }
}
