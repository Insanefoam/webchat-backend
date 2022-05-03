import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('roulette_sessions', (builder) => {
    builder.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));

    builder.uuid('userId').notNullable();
    builder.timestamp('startedAt').notNullable();
    builder.timestamp('endedAt').nullable();

    builder.foreign('userId').references('users.id');

    builder.timestamps(true, true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('roulette_sessions');
}
