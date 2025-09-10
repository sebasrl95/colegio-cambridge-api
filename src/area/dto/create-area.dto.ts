import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAreaDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Area XXX',
    description: 'Nombre del área',
  })
  nombre: string;
}
