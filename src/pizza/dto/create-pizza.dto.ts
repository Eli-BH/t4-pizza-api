import { IsNotEmpty, IsString, IsArray, IsEnum } from 'class-validator';
import { SizeName } from '../entities/size.entity';
import { SauceName } from '../entities/sauce.entity';
import { ToppingName } from '../entities/topping.entity';

export class CreatePizzaDto {
  @IsArray()
  @IsString({ each: true })
  toppings: ToppingName[];

  @IsNotEmpty()
  @IsEnum(SizeName)
  size: SizeName;

  @IsNotEmpty()
  @IsEnum(SauceName)
  sauce: SauceName;
}
