import { knex as createKnex, Knex } from 'knex';
import dotenv from 'dotenv';

dotenv.config();

const config: Knex.Config = {
  client: 'pg',
  connection: process.env.DATABASE_URL ?? {
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'postgres',
    database: 'todos_db',
  },
  pool: { min: 1, max: 5 },
  migrations: {
    tableName: 'knex_migrations',
    directory: '../knex_migrations',
  },
};

export default createKnex(config);
