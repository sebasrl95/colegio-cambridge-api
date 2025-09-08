import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Area } from './area.entity';
import { Empleado } from './empleado.entity';

@Entity()
export class Oficina {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  codigo: string;

  @ManyToOne(() => Area, (area) => area.oficinas)
  area: Area;

  @OneToMany(() => Empleado, (empleado) => empleado.oficina)
  empleados: Empleado[];
}
