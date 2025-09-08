import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Oficina } from './oficina.entity';
import { Empleado } from './empleado.entity';

@Entity()
export class Area {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @OneToMany(() => Oficina, (oficina) => oficina.area)
  oficinas: Oficina[];

  @OneToMany(() => Empleado, (empleado) => empleado.area)
  empleados: Empleado[];
}
