import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { Empleado } from './empleado.entity';

export enum TipoProfesor {
  PLANTA = 'planta',
  CONTRATISTA = 'contratista',
}

@Entity('profesores')
export class Profesor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: TipoProfesor })
  tipo: 'planta' | 'contratista';

  @OneToOne(() => Empleado, (empleado) => empleado.profesor)
  empleado: Empleado;
}
