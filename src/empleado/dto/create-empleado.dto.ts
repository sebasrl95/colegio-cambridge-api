import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateEmpleadoDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  documento: string;

  @IsString()
  @IsNotEmpty()
  tipo: string;

  @IsOptional()
  tipoProfesor?: string;

  @IsOptional()
  areaId?: number;

  @IsOptional()
  oficinaId?: number;
}
