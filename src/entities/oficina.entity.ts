import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Area } from './area.entity';
import { Empleado } from './empleado.entity';

@Entity('oficina')
export class Oficina {
  @ApiProperty({ example: 101, description: 'Código único de la oficina' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'OF-101',
    description: 'Código asignado a la oficina',
  })
  @Column({ unique: true })
  codigo: string;

  @ManyToOne(() => Area, (area) => area.oficinas, { eager: true })
  area: Area;

  @OneToMany(() => Empleado, (empleado) => empleado.oficina)
  empleados: Empleado[];
}
