import { Item } from './entities/item.entity';
import { DataSource } from 'typeorm';
import { User } from './entities/user.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'postgres',
  logging: true,
  synchronize: false,
  entities: [Item, User],
  migrations: ['dist/migrations/*.js'],
});
