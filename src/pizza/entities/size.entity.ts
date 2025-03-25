import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IsEnum, IsNotEmpty } from 'class-validator';

export enum SizeName {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
  EXTRA_LARGE = 'extra_large',
}

@Entity()
export class Size {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: SizeName })
  @IsEnum(SizeName)
  @IsNotEmpty()
  name: SizeName;
}
