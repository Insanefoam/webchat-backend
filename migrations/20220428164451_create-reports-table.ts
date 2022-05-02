import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('reports', (builder) => {
    builder.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));

    builder.uuid('senderId').notNullable();
    builder.uuid('reportedUserId').notNullable();
    builder.string('reportContent').notNullable();

    builder.foreign('senderId').references('users.id');
    builder.foreign('reportedUserId').references('users.id');

    builder.timestamps(true, true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('reports');
}
