import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Empleado } from './empleado.entity';
import { Oficina } from './oficina.entity';

@Entity('area')
export class Area {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  nombre: string;

  @OneToMany(() => Oficina, (oficina) => oficina.area)
  oficinas: Oficina[];

  @OneToMany(() => Empleado, (empleado) => empleado.area)
  empleados: Empleado[];
}
