import { Inject, Injectable } from '@nestjs/common';
import { RedisClientFactory, RedisClientType } from './redis-client.factory';

@Injectable()
export class RedisService {
  constructor(
    @Inject(RedisClientFactory.provide)
    private readonly client: RedisClientType,
  ) {
    client.connect();
  }

  async setPrimitive(key: string, value: string | number): Promise<boolean> {
    try {
      await this.client.set(key, value);

      return true;
    } catch (e) {
      return false;
    }
  }

  async setObject<T>(key: string, value: T): Promise<boolean> {
    try {
      await this.client.set(key, JSON.stringify(value));

      return true;
    } catch (e) {
      return false;
    }
  }

  async getString(key: string): Promise<string> {
    const res = await this.client.get(key);

    return res;
  }

  async getNumber(key: string): Promise<number> {
    const res = await this.client.get(key);

    return Number(res);
  }

  async getObject<T>(key: string): Promise<T> {
    const res = await this.client.get(key);

    const obj = JSON.parse(res) as T;

    return obj;
  }
}
