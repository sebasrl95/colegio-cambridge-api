import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('salon')
export class Salon {
  @ApiProperty({ example: 1, description: 'Identificador único del salón' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'SAL-201', description: 'Código asignado al salón' })
  @Column({ unique: true })
  codigo: string;
}
