import { Injectable } from '@nestjs/common';
import { CreatePizzaDto } from './dto/create-pizza.dto';
import { Size, SizeName } from './entities/size.entity';
import { Sauce, SauceName } from './entities/sauce.entity';
import { Topping, ToppingName } from './entities/topping.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pizza } from './entities/pizza.entity';

@Injectable()
export class PizzaService {
  constructor(
    @InjectRepository(Pizza)
    private pizzaRepository: Repository<Pizza>,
    @InjectRepository(Size)
    private sizeRepository: Repository<Size>,
    @InjectRepository(Sauce)
    private sauceRepository: Repository<Sauce>,
    @InjectRepository(Topping)
    private toppingRepository: Repository<Topping>,
  ) {}

  async getMenu() {
    try {
      const menuOptions = {
        sizes: Object.values(SizeName),
        sauces: Object.values(SauceName),
        toppings: Object.values(ToppingName),
      };

      return menuOptions;
    } catch (error) {
      throw new Error('Failed to retrieve menu');
    }
  }

  async createPizza(createPizzaDto: CreatePizzaDto): Promise<Pizza> {
    const { size, sauce, toppings } = createPizzaDto;

    const pizzaSize = await this.sizeRepository.findOne({
      where: { name: size },
    });
    const pizzaSauce = await this.sauceRepository.findOne({
      where: { name: sauce },
    });
    const pizzaToppings: Topping[] = [];

    if (!pizzaSize) {
      throw new Error(`Size ${size} is not available`);
    }

    if (!pizzaSauce) {
      throw new Error(`Sauce ${sauce} is not available`);
    }

    for (const topping of toppings) {
      const pizzaTopping = await this.toppingRepository.findOne({
        where: { name: topping },
      });
      if (!pizzaTopping) {
        // if we don't find the topping, we can log a warning and continue with available toppings
        // console.warn(`Topping ${topping} is not available`);
        // continue;
        throw new Error(`Topping ${topping} is not available`);
      }
      pizzaToppings.push(pizzaTopping);
    }

    const newPizza = this.pizzaRepository.create({
      size: pizzaSize,
      sauce: pizzaSauce,
      toppings: pizzaToppings,
    });

    await this.pizzaRepository.save(newPizza);
    return newPizza;
  }

  async removePizza(id: number): Promise<void> {
    try {
      const pizza = await this.pizzaRepository.findOne({ where: { id } });
      if (!pizza) {
        throw new Error('Pizza not found');
      }

      await this.pizzaRepository.remove(pizza);
    } catch (error) {
      throw new Error(`Failed to remove pizza: ${error.message}`);
    }
  }
}
