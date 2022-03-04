import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('chat_rooms', (builder) => {
    builder.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    builder.timestamps(true, true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('chat_rooms');
}
