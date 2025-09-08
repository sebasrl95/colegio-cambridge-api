import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmpleadoDto } from './dto/create-empleado.dto';
import { UpdateEmpleadoDto } from './dto/update-empleado.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Administrativo } from 'src/entities/administrativo.entity';
import { Empleado } from 'src/entities/empleado.entity';
import { Profesor } from 'src/entities/profesor.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EmpleadoService {
  constructor(
    @InjectRepository(Empleado)
    private empleadoRepo: Repository<Empleado>,
    @InjectRepository(Profesor)
    private profesorRepo: Repository<Profesor>,
    @InjectRepository(Administrativo)
    private adminRepo: Repository<Administrativo>,
  ) {}

  async create(createEmpleadoDto: CreateEmpleadoDto) {
    let empleado: Empleado;

    if (createEmpleadoDto.tipo.toLowerCase() === 'profesor') {
      empleado = this.empleadoRepo.create({
        ...createEmpleadoDto,
        tipo: 'profesor',
      });

      return this.empleadoRepo.save(empleado);
    }

    if (createEmpleadoDto.tipo.toLowerCase() === 'administrativo') {
      empleado = this.empleadoRepo.create({
        ...createEmpleadoDto,
        tipo: 'administrativo',
      });

      return this.empleadoRepo.save(empleado);
    }

    throw new Error('Tipo de empleado no válido');
  }

  findAll() {
    return this.empleadoRepo.find({
      relations: ['area', 'oficina'],
    });
  }

  async findOne(id: number) {
    const empleado = await this.empleadoRepo.findOne({
      where: { id },
      relations: ['area', 'oficina'],
    });

    if (!empleado) {
      throw new NotFoundException(`Empleado con id ${id} no encontrado`);
    }
    return empleado;
  }

  async update(id: number, updateEmpleadoDto: UpdateEmpleadoDto) {
    const empleado = await this.findOne(id);
    Object.assign(empleado, updateEmpleadoDto);
    return this.empleadoRepo.save(empleado);
  }

  async remove(id: number) {
    const empleado = await this.findOne(id);
    return this.empleadoRepo.remove(empleado);
  }
}
