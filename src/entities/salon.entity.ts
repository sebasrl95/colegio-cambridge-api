import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('salon')
export class Salon {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  codigo: string;
}
