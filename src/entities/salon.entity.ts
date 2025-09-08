import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Salon {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  codigo: string;
}
