import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Empleado } from './empleado.entity';

export enum TipoProfesor {
  PLANTA = 'planta',
  CONTRATISTA = 'contratista',
}

@Entity('profesores')
export class Profesor {
  @ApiProperty({ example: 1, description: 'Identificador único del profesor' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'planta',
    description: 'Tipo de profesor: planta o contratista',
    enum: ['planta', 'contratista'],
  })
  @Column({ type: 'enum', enum: TipoProfesor })
  tipo: 'planta' | 'contratista';

  @OneToOne(() => Empleado, (empleado) => empleado.profesor)
  empleado: Empleado;
}
