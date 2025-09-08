import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  TableInheritance,
} from 'typeorm';
import { Area } from './area.entity';
import { Oficina } from './oficina.entity';

@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'tipo' } })
export abstract class Empleado {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  documento: string;

  @ManyToOne(() => Area, (area) => area.empleados)
  area: Area;

  @ManyToOne(() => Oficina, (oficina) => oficina.empleados)
  oficina: Oficina;
}
