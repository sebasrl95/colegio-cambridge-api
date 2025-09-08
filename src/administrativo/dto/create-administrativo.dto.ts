import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class CreateAdministrativoDto {
  @ApiProperty({ example: 1, description: 'ID del empleado asociado' })
  @IsInt()
  empleadoId: number;
}
