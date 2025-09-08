import { Injectable } from '@nestjs/common';
import { CreateProfesorDto } from './dto/create-profesor.dto';
import { UpdateProfesorDto } from './dto/update-profesor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Profesor } from 'src/entities/profesor.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProfesorService {
  constructor(
    @InjectRepository(Profesor)
    private readonly profesorRepository: Repository<Profesor>,
  ) {}

  create(createProfesorDto: CreateProfesorDto) {
    const profesor = this.profesorRepository.create({
      tipo: createProfesorDto.tipo,
      empleado: { id: createProfesorDto.empleadoId },
    });
    return this.profesorRepository.save(profesor);
  }

  findAll() {
    return this.profesorRepository.find({ relations: ['empleado'] });
  }

  findOne(id: number) {
    return this.profesorRepository.findOne({
      where: { id },
      relations: ['empleado'],
    });
  }

  async update(id: number, updateProfesorDto: UpdateProfesorDto) {
    await this.profesorRepository.update(id, {
      tipo: updateProfesorDto.tipo,
      empleado: updateProfesorDto.empleadoId
        ? { id: updateProfesorDto.empleadoId }
        : undefined,
    });
    return this.findOne(id);
  }

  remove(id: number) {
    return this.profesorRepository.delete(id);
  }
}
