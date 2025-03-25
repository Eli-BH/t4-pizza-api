import { Sauce, SauceName } from 'src/pizza/entities/sauce.entity';
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';

export default class SauceSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const sauceRepository = dataSource.getRepository(Sauce);
    const sauces: SauceName[] = [
      SauceName.TOMATO,
      SauceName.GARLIC,
      SauceName.BBQ,
      SauceName.PESTO,
      SauceName.ALFREDO,
    ];

    for (const sauce of sauces) {
      const existingSauce = await sauceRepository.findOne({
        where: { name: sauce },
      });

      if (!existingSauce) {
        await sauceRepository.save({ name: sauce });
      }
    }
  }
}
