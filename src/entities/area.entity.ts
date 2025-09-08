import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Empleado } from './empleado.entity';
import { Oficina } from './oficina.entity';

@Entity('area')
export class Area {
  @ApiProperty({ example: 1, description: 'Identificador único del área' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Ciencias', description: 'Nombre del área' })
  @Column({ unique: true })
  nombre: string;

  @OneToMany(() => Oficina, (oficina) => oficina.area)
  oficinas: Oficina[];

  @OneToMany(() => Empleado, (empleado) => empleado.area)
  empleados: Empleado[];
}
