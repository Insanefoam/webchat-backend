import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('chat_participants', (builder) => {
    builder.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    builder.uuid('chatRoomId');
    builder.uuid('userId');
    builder.timestamps(true, true, true);

    builder.foreign('chatRoomId').references('chat_rooms.id');
    builder.foreign('userId').references('users.id');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('chat_participants');
}
