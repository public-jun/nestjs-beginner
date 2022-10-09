import { Item } from './entities/item.entity';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'postgres',
  logging: true,
  synchronize: false,
  entities: [Item],
  migrations: ['dist/migrations/*.js'],
});
