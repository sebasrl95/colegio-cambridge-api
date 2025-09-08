import { Injectable } from '@nestjs/common';
import { CreateOficinaDto } from './dto/create-oficina.dto';
import { UpdateOficinaDto } from './dto/update-oficina.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Oficina } from 'src/entities/oficina.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OficinaService {
  constructor(
    @InjectRepository(Oficina)
    private readonly oficinaRepository: Repository<Oficina>,
  ) {}

  create(createOficinaDto: CreateOficinaDto) {
    const oficina = this.oficinaRepository.create({
      ...createOficinaDto,
      area: { id: createOficinaDto.areaId },
    });
    return this.oficinaRepository.save(oficina);
  }

  findAll() {
    return this.oficinaRepository.find({ relations: ['area', 'empleados'] });
  }

  findOne(id: number) {
    return this.oficinaRepository.findOne({
      where: { id },
      relations: ['area', 'empleados'],
    });
  }

  async update(id: number, updateOficinaDto: UpdateOficinaDto) {
    await this.oficinaRepository.update(id, {
      ...updateOficinaDto,
      area: updateOficinaDto.areaId
        ? { id: updateOficinaDto.areaId }
        : undefined,
    });
    return this.findOne(id);
  }

  remove(id: number) {
    return this.oficinaRepository.delete(id);
  }
}
