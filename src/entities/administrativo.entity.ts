import { Entity, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { Empleado } from './empleado.entity';

@Entity('administrativo')
export class Administrativo {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Empleado, (empleado) => empleado.administrativo)
  empleado: Empleado;
}
