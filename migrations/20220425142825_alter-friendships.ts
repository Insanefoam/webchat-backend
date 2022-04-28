import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('friendships', (builder) => {
    builder.renameColumn('firstUserId', 'userId');
    builder.renameColumn('secondUserId', 'friendId');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('friendships', (builder) => {
    builder.renameColumn('userId', 'firstUserId');
    builder.renameColumn('friendId', 'secondUserId');
  });
}
