import { Injectable } from '@nestjs/common';
import { CreatePizzaDto } from './dto/create-pizza.dto';
import { Size } from './entities/size.entity';
import { Sauce } from './entities/sauce.entity';
import { Topping } from './entities/topping.entity';
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
      const sizes = await this.sizeRepository.find();
      const sauces = await this.sauceRepository.find();
      const toppings = await this.toppingRepository.find();

      return {
        sizes,
        sauces,
        toppings,
      };
    } catch (error) {
      throw new Error('Failed to retrieve menu');
    }
  }

  async createPizza(createPizzaDto: CreatePizzaDto): Promise<Pizza> {
    try {
      const { size, sauce, toppings } = createPizzaDto;

      // retrieve pizza ingredients
      const pizzaSize = await this.sizeRepository.findOne({
        where: { name: size },
      });

      const pizzaSauce = await this.sauceRepository.findOne({
        where: { name: sauce },
      });
      const pizzaToppings: Topping[] = [];

      // validate dto with ingredients
      if (!pizzaSize) {
        throw new Error('Invalid size');
      }

      if (!pizzaSauce) {
        throw new Error('Invalid sauce');
      }

      for (const topping of toppings) {
        const pizzaTopping = await this.toppingRepository.findOne({
          where: { name: topping },
        });
        if (!pizzaTopping) {
          throw new Error(`Invalid topping: ${topping}`);
          /*
            if we don't find the topping we can also log a
            warning and skip to available toppings
              console.warn(`Topping not found: ${topping}. Skipping...`);
              continue;
          */
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
    } catch (error) {
      throw new Error(`Failed to create pizza: ${error.message}`);
    }
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
