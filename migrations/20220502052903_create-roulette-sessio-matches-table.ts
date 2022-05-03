import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('roulette_session_matches', (builder) => {
    builder.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));

    builder.uuid('sessionId').notNullable();
    builder.uuid('userId').notNullable();
    builder.uuid('companionId').notNullable();
    builder.timestamp('startedAt').notNullable();
    builder.timestamp('endedAt').nullable();

    builder.foreign('sessionId').references('roulette_sessions.id');
    builder.foreign('userId').references('users.id');
    builder.foreign('companionId').references('users.id');

    builder.timestamps(true, true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('roulette_session_matches');
}
