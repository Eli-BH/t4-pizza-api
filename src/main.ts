import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { runSeeders } from 'typeorm-extension';
import { AppDataSource } from 'data-source';
import { ValidationPipe } from '@nestjs/common';
import SauceSeeder from './seeders/sauce.seeder';
import ToppingSeeder from './seeders/topping.seeder';
import SizeSeeder from './seeders/size.seeder';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  await AppDataSource.initialize();

  //run seeders
  await runSeeders(AppDataSource, {
    seeds: [SauceSeeder, ToppingSeeder, SizeSeeder],
  });

  console.log('Seeding complete');

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
