import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Administrativo } from './administrativo.entity';
import { Area } from './area.entity';
import { Oficina } from './oficina.entity';
import { Profesor } from './profesor.entity';

export enum TipoEmpleado {
  PROFESOR = 'profesor',
  ADMINISTRATIVO = 'administrativo',
}

@Entity('empleado')
export class Empleado {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  documento: string;

  @Column()
  nombre: string;

  @Column({ type: 'enum', enum: TipoEmpleado })
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
