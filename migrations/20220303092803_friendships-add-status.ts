import { Knex } from 'knex';
import { FriendshipStatus } from '../src/friendships/common/friendships.types';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('friendships', (builder) => {
    builder.enum('status', Object.values(FriendshipStatus));
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('friendships', (builder) => {
    builder.dropColumn('status');
  });
}
