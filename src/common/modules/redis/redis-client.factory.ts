import { createClient } from 'redis';

export const RedisClientFactory = {
  provide: 'REDIS_CLIENT',
  useFactory: () => {
    const client = createClient({ url: 'redis://:@localhost:6379' });

    return client;
  },
};

export type RedisClientType = ReturnType<
  typeof RedisClientFactory['useFactory']
>;
