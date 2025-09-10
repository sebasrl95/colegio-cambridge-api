import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsInt } from 'class-validator';

export class CreateOficinaDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'OF-101', description: 'Código único de la oficina' })
  codigo: string;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty({
    example: 1,
    description: 'ID del área a la que pertenece la oficina',
  })
  areaId: number;
}
