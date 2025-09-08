import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSalonDto {
  @ApiProperty({
    example: 'SAL-201',
    description: 'Código único del salón de clase',
  })
  @IsString()
  @IsNotEmpty()
  codigo: string;
}
