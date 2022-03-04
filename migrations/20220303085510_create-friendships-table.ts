import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('friendships', (builder) => {
    builder.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    builder.uuid('firstUserId');
    builder.uuid('secondUserId');

    builder.timestamps(true, true, true);

    builder.foreign('firstUserId').references('users.id');
    builder.foreign('secondUserId').references('users.id');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('friendships');
}
