import { Topping, ToppingName } from 'src/pizza/entities/topping.entity';
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';

export default class ToppingSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const toppingRepository = dataSource.getRepository(Topping);

    const toppings: ToppingName[] = [
      ToppingName.PEPPERONI,
      ToppingName.MUSHROOM,
      ToppingName.ONION,
      ToppingName.SAUSAGE,
      ToppingName.BACON,
      ToppingName.EXTRA_CHEESE,
      ToppingName.BLACK_OLIVES,
      ToppingName.GREEN_PEPPERS,
      ToppingName.PINEAPPLE,
      ToppingName.SPINACH,
      ToppingName.JALAPENOS,
      ToppingName.CHICKEN,
      ToppingName.BEEF,
    ];

    for (const name of toppings) {
      const existingTopping = await toppingRepository.findOne({
        where: { name: name },
      });

      if (!existingTopping) {
        await toppingRepository.save({ name: name });
      }
    }
  }
}
