import SauceSeeder from 'src/seeders/sauce.seeder';
import SizeSeeder from 'src/seeders/size.seeder';
import ToppingSeeder from 'src/seeders/topping.seeder';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';

// in prod, creds would be in environment variables or a secure vault
const options: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'password',
  database: 'pizza_db',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  seeds: [SauceSeeder, ToppingSeeder, SizeSeeder],
  synchronize: true, // WARNING: Do not use synchronize in production as it can lead to data loss.
};

export const AppDataSource = new DataSource(options);
