import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('todos', (table) => {
    table.boolean('completed').notNullable().defaultTo(false);
  });
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('todos', (table) => {
    table.dropColumn('completed');
  });
}


