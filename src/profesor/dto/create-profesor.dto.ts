import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsInt, IsEnum } from 'class-validator';
import { TipoProfesor } from 'src/entities/profesor.entity';

export class CreateProfesorDto {
  @ApiProperty({ enum: TipoProfesor })
  @IsEnum(TipoProfesor)
  @IsNotEmpty()
  tipo: TipoProfesor;

  @ApiProperty({ example: 1, description: 'ID del empleado asociado' })
  @IsInt()
  empleadoId: number;
}
