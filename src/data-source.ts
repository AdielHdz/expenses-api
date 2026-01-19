import 'dotenv/config';
import 'reflect-metadata';
import { DataSource } from 'typeorm';

const options = {
  type: 'postgres',
  host: process.env.PGHOST, // host de Railway
  port: +process.env.PGPORT, // puerto de Railway
  username: process.env.PGUSER, // usuario de Railway
  password: process.env.PGPASSWORD, // contraseña de Railway
  database: process.env.PGDATABASE, // nombre de la DB de Railway

  entities: ['src/**/*.entity.ts'],
  migrations: ['src/database/migrations/*.ts'],
  synchronize: false,
  seeds: ['src/database/seeds/**/*{.ts,.js}'],
  factories: ['src/database/factories/**/*{.ts,.js}'],
};

export const AppDataSource = new DataSource(options);
