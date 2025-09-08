import { ChildEntity, Column } from 'typeorm';
import { Empleado } from './empleado.entity';

@ChildEntity()
export class Profesor extends Empleado {
  @Column()
  tipoProfesor: string; // "Planta" | "Contratista"
}
