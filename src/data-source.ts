import 'dotenv/config';
import 'reflect-metadata';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres', // literal
  host: process.env.PGHOST, // ! asegura que no es undefined
  port: +process.env.PGPORT,
  username: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  entities: [
    process.env.ENVIRONMENT === 'production'
      ? 'dist/**/*.entity.js'
      : 'src/**/*.entity.ts',
  ], // usa dist para build
  migrations: [
    process.env.ENVIRONMENT === 'production'
      ? 'dist/database/migrations/*.js'
      : 'src/database/migrations/*.ts',
  ], // usa dist para build
  synchronize: false,
});
