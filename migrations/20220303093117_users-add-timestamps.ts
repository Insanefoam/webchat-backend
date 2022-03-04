import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('users', (builder) => {
    builder.timestamps(true, true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('users', (builder) => {
    builder.dropColumns('updatedAt', 'createdAt');
  });
}
