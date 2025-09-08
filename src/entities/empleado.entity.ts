import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Administrativo } from './administrativo.entity';
import { Area } from './area.entity';
import { Oficina } from './oficina.entity';
import { Profesor } from './profesor.entity';

@Entity('empleado')
export class Empleado {
  @ApiProperty({ example: 1, description: 'Identificador único del empleado' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: '123456789',
    description: 'Documento de identificación',
  })
  @Column({ unique: true })
  documento: string;

  @ApiProperty({
    example: 'Juan Pérez',
    description: 'Nombre completo del empleado',
  })
  @Column()
  nombre: string;

  @ApiProperty({
    example: 'profesor',
    description: 'Tipo de empleado: profesor o administrativo',
    enum: ['profesor', 'administrativo'],
  })
  @Column({ type: 'enum', enum: ['profesor', 'administrativo'] })
  tipo: 'profesor' | 'administrativo';

  @ManyToOne(() => Area, (area) => area.empleados, { eager: true })
  area: Area;

  @ManyToOne(() => Oficina, (oficina) => oficina.empleados, { eager: true })
  oficina: Oficina;

  @OneToOne(() => Profesor, (profesor) => profesor.empleado, {
    nullable: true,
    cascade: true,
  })
  @JoinColumn()
  profesor: Profesor;

  @OneToOne(() => Administrativo, (administrativo) => administrativo.empleado, {
    nullable: true,
    cascade: true,
  })
  @JoinColumn()
  administrativo: Administrativo;
}
