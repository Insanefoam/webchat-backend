import { Knex } from 'knex';
import { faker } from '@faker-js/faker';
import { UserEntity } from 'src/users/entities/user.entity';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('users').del();

  // Inserts seed entries
  const users: Partial<UserEntity>[] = [...new Array(100)].map(() => ({
    username: faker.internet.userName(),
    nickname: faker.internet.userName(),
    password: faker.internet.password(),
    avatarUrl: faker.internet.avatar(),
  }));
  await knex('users').insert(users);
}
