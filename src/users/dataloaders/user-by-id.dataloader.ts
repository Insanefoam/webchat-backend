import { Injectable } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { NestDataLoader } from 'libs/insanefoam-dataloader/src/dataloader.interface';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UserByIdDataloader implements NestDataLoader<string, UserEntity> {
  generateDataLoader(): DataLoader<string, UserEntity> {
    const dataloader = new DataLoader((ids: string[]) => {
      return UserEntity.query().findByIds(ids);
    });

    return dataloader;
  }
}
