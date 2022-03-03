import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Knex from 'knex';
import { Model } from 'objection';

@Injectable()
export class ObjectionConfigService {
  constructor(readonly configService: ConfigService) {
    const knex = Knex({
      client: 'postgresql',
      connection: {
        host: configService.get<string>('database.host'),
        port: configService.get<number>('database.port'),
        database: configService.get<string>('database.name'),
        user: configService.get<string>('database.username'),
        password: configService.get<string>('database.password'),
      },
      debug: true,
    });

    Model.knex(knex);
  }
}
