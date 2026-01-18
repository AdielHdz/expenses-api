import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  host: process.env.PGHOST, // host de Railway
  port: +process.env.PGPORT, // puerto de Railway
  username: process.env.PGUSER, // usuario de Railway
  password: process.env.PGPASSWORD, // contraseña de Railway
  database: process.env.PGDATABASE, // nombre de la DB de Railway
}));
