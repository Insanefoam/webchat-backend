import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.raw('create extension if not exists "uuid-ossp"');

  await knex.schema.createTable('users', (builder) => {
    builder.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    builder.text('username');
    builder.text('password');
    builder.text('nickname');
    builder.text('avatarUrl').nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('users');
}
