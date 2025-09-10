import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsEnum } from 'class-validator';
import { TipoEmpleado } from 'src/entities/empleado.entity';

export class CreateEmpleadoDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Juan Pérez',
    description: 'Nombre completo del empleado',
  })
  nombre: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '123456789',
    description: 'Documento de identificación',
  })
  documento: string;

  @ApiProperty({ enum: TipoEmpleado })
  @IsEnum(TipoEmpleado)
  @ApiProperty({
    example: 'profesor',
    description: 'Tipo de empleado: profesor o administrativo',
    enum: TipoEmpleado,
  })
  tipo: TipoEmpleado;

  @IsOptional()
  @ApiProperty({
    example: '1',
    description: 'Id del profesor',
    required: false,
  })
  profesorId?: number;

  @IsOptional()
  @ApiProperty({
    example: '1',
    description: 'Id del área',
    required: false,
  })
  areaId?: number;

  @IsOptional()
  @ApiProperty({
    example: '1',
    description: 'Id de la oficina',
    required: false,
  })
  oficinaId?: number;
}
