import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Area } from './area.entity';
import { Empleado } from './empleado.entity';

@Entity('oficina')
export class Oficina {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  codigo: string;

  @ManyToOne(() => Area, (area) => area.oficinas, { eager: true })
  area: Area;

  @OneToMany(() => Empleado, (empleado) => empleado.oficina)
  empleados: Empleado[];
}
