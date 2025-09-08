import { Entity, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Empleado } from './empleado.entity';

@Entity('administrativo')
export class Administrativo {
  @ApiProperty({
    example: 1,
    description: 'Identificador único del administrativo',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Empleado, (empleado) => empleado.administrativo)
  empleado: Empleado;
}
