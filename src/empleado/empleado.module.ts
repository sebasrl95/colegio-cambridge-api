import { Module } from '@nestjs/common';
import { EmpleadoService } from './empleado.service';
import { EmpleadoController } from './empleado.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Empleado } from 'src/entities/empleado.entity';
import { Profesor } from 'src/entities/profesor.entity';
import { Administrativo } from 'src/entities/administrativo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Empleado, Profesor, Administrativo])],
  controllers: [EmpleadoController],
  providers: [EmpleadoService],
})
export class EmpleadoModule {}
