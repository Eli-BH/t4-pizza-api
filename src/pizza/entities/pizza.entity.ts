import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Size } from './size.entity';
import { Sauce } from './sauce.entity';
import { Topping } from './topping.entity';

@Entity()
export class Pizza {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Size)
  size: Size;

  @ManyToOne(() => Sauce)
  sauce: Sauce;

  @ManyToMany(() => Topping)
  @JoinTable()
  toppings: Topping[];
}
