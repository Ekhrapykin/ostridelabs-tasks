import type { Knex } from "knex";
import dotenv from 'dotenv';


dotenv.config();


const config: { [key: string]: Knex.Config } = {
  development: {
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
  },


  staging: {
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
  },


  production: {
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
  }

};


export default config;
