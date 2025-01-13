import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';

console.log(process.env.DATABASE_PASSWORD);
export const dataSourceConfig = {
  type: 'postgres',
  host: process.env.DATABASE_HOST as string,
  port: 5432,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: process.env.DATABASE_SYNCHRONIZE === 'true',
  dropSchema: false,
  keepConnectionAlive: true,
  logging: process.env.NODE_ENV !== 'production',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  cli: {
    entitiesDir: 'src',
    migrationsDir: 'src/database/migrations',
    subscribersDir: 'subscriber',
  },
  extra: {
    max: 100,
  },
} as DataSourceOptions
export const AppDataSource = new DataSource(dataSourceConfig);
