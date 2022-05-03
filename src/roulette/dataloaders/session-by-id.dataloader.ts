import { Injectable } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { NestDataLoader } from 'libs/insanefoam-dataloader/src/dataloader.interface';
import { RouletteSessionEntity } from '../entities/roulette-session.entity';

@Injectable()
export class SessionByIdDataloader
  implements NestDataLoader<string, RouletteSessionEntity>
{
  generateDataLoader(): DataLoader<string, RouletteSessionEntity> {
    const dataloader = new DataLoader((ids: string[]) => {
      return RouletteSessionEntity.query().findByIds(ids);
    });

    return dataloader;
  }
}
