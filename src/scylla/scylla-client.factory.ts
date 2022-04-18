import { FactoryProvider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client } from 'cassandra-driver';

export const ScyllaClientFactory: FactoryProvider = {
  provide: 'SCYLLA_CLIENT',
  useFactory: (configService: ConfigService): Client => {
    const client = new Client({
      contactPoints: ['localhost:9042'],
      localDataCenter: 'datacenter1',
      keyspace: 'webchat',
    });

    return client;
  },
  inject: [ConfigService],
};
