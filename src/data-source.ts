import 'dotenv/config';
import 'reflect-metadata';
import { DataSource } from 'typeorm';

// DataSource para TypeORM (migraciones y NestJS)
export const AppDataSource = new DataSource({
  type: 'postgres', // literal 'postgres'
  host: process.env.PGHOST,
  port: +process.env.PGPORT,
  username: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  entities: ['src/**/*.entity.ts'],
  migrations: ['src/database/migrations/*.ts'],
  synchronize: false, // nunca true en producción
});

// Configuración de seeders (solo para typeorm-extension)
export const SeederConfig = {
  seeds: ['src/database/seeds/**/*{.ts,.js}'],
  factories: ['src/database/factories/**/*{.ts,.js}'],
};
