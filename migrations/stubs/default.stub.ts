import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('teams_members', (builder) => {
    builder.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));

    builder.uuid('userId').notNullable();
    builder.uuid('teamId').notNullable();
    builder.boolean('isTeamCreator').defaultTo(false);

    builder.foreign('userId').references('users.id');
    builder.foreign('teamId').references('teams.id');

    builder.unique(['userId', 'teamId']);

    builder.timestamps(true, true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('teams_members');
}
