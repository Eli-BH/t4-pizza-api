import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IsEnum, IsNotEmpty } from 'class-validator';

export enum SauceName {
  TOMATO = 'tomato',
  GARLIC = 'garlic',
  BBQ = 'bbq',
  PESTO = 'pesto',
  ALFREDO = 'alfredo',
}

@Entity()
export class Sauce {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: SauceName })
  @IsEnum(SauceName)
  @IsNotEmpty()
  name: SauceName;
}
