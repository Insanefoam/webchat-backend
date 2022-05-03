import { Field, ObjectType } from '@nestjs/graphql';
import { RouletteSessionEntity } from '../entities/roulette-session.entity';

@ObjectType('RouletteSession')
export class RouletteSessionModel {
  constructor(entity: RouletteSessionEntity) {
    Object.assign(this, entity);
  }

  @Field()
  id: string;

  static createFromEntity(entity: RouletteSessionEntity): RouletteSessionModel;
  static createFromEntity(
    entities: RouletteSessionEntity[],
  ): RouletteSessionModel[];
  static createFromEntity(
    entityOrEntities: RouletteSessionEntity | RouletteSessionEntity[],
  ): RouletteSessionModel | RouletteSessionModel[] {
    if (Array.isArray(entityOrEntities)) {
      return entityOrEntities.map<RouletteSessionModel>(
        RouletteSessionModel.createFromEntity,
      );
    }

    return new RouletteSessionModel(entityOrEntities);
  }
}
