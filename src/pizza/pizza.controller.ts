import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { PizzaService } from './pizza.service';
import { CreatePizzaDto } from './dto/create-pizza.dto';

@Controller('pizza')
export class PizzaController {
  constructor(private readonly pizzaService: PizzaService) {}

  @Get('menu')
  getMenu() {
    return this.pizzaService.getMenu();
  }

  @Post()
  create(@Body() createPizzaDto: CreatePizzaDto) {
    return this.pizzaService.createPizza(createPizzaDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.pizzaService.removePizza(+id);
  }
}
