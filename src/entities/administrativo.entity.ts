import { ChildEntity } from 'typeorm';
import { Empleado } from './empleado.entity';

@ChildEntity()
export class Administrativo extends Empleado {}
