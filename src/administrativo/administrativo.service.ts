import { Injectable } from '@nestjs/common';
import { CreateAdministrativoDto } from './dto/create-administrativo.dto';
import { UpdateAdministrativoDto } from './dto/update-administrativo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Administrativo } from 'src/entities/administrativo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AdministrativoService {
  constructor(
    @InjectRepository(Administrativo)
    private readonly administrativoRepository: Repository<Administrativo>,
  ) {}

  create(createAdministrativoDto: CreateAdministrativoDto) {
    const administrativo = this.administrativoRepository.create({
      empleado: { id: createAdministrativoDto.empleadoId },
    });
    return this.administrativoRepository.save(administrativo);
  }

  findAll() {
    return this.administrativoRepository.find({ relations: ['empleado'] });
  }

  findOne(id: number) {
    return this.administrativoRepository.findOne({
      where: { id },
      relations: ['empleado'],
    });
  }

  async update(id: number, updateAdministrativoDto: UpdateAdministrativoDto) {
    await this.administrativoRepository.update(id, {
      empleado: updateAdministrativoDto.empleadoId
        ? { id: updateAdministrativoDto.empleadoId }
        : undefined,
    });
    return this.findOne(id);
  }

  remove(id: number) {
    return this.administrativoRepository.delete(id);
  }
}
