import { Module } from '@nestjs/common';
import { PizzaService } from './pizza.service';
import { PizzaController } from './pizza.controller';
import { Pizza } from './entities/pizza.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sauce } from './entities/sauce.entity';
import { Topping } from './entities/topping.entity';
import { Size } from './entities/size.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pizza, Sauce, Topping, Size])],
  controllers: [PizzaController],
  providers: [PizzaService],
})
export class PizzaModule {}
