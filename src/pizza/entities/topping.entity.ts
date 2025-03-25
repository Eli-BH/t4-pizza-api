import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsEnum, IsNotEmpty } from 'class-validator';

export enum ToppingName {
  PEPPERONI = 'pepperoni',
  MUSHROOM = 'mushroom',
  ONION = 'onion',
  SAUSAGE = 'sausage',
  BACON = 'bacon',
  EXTRA_CHEESE = 'extra_cheese',
  BLACK_OLIVES = 'black_olives',
  GREEN_PEPPERS = 'green_peppers',
  PINEAPPLE = 'pineapple',
  SPINACH = 'spinach',
  GARLIC = 'garlic',
  TOMATO = 'tomato',
  JALAPENOS = 'jalapenos',
  CHICKEN = 'chicken',
  BEEF = 'beef',
}

@Entity()
export class Topping {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: ToppingName })
  @IsEnum(ToppingName)
  @IsNotEmpty()
  name: ToppingName;
}
