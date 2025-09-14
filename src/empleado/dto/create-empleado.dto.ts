import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export enum TipoProfesor {
  PLANTA = 'planta',
  CONTRATISTA = 'contratista',
}

export class CreateEmpleadoDto {
  @ApiProperty({
    example: 'Juan Pérez',
    description: 'Nombre completo del empleado',
  })
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @ApiProperty({
    example: '123456789',
    description: 'Documento de identificación',
  })
  @IsString()
  @IsNotEmpty()
  documento: string;

  @ApiProperty({
    example: 1,
    description: 'ID del área a la que pertenece el empleado',
  })
  @IsMongoId()
  @IsNotEmpty()
  area: string;

  @ApiProperty({
    example: '1',
    description: 'Id de la oficina',
    required: false,
  })
  @IsMongoId()
  @IsNotEmpty()
  oficina: string;

  @ApiProperty({ enum: ['profesor', 'administrativo'] })
  @IsEnum(['profesor', 'administrativo'])
  tipoEmpleado: 'profesor' | 'administrativo';

  @ApiProperty({ enum: TipoProfesor, required: false })
  @IsEnum(TipoProfesor)
  tipoProfesor?: TipoProfesor;
}
