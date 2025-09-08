import { Injectable } from '@nestjs/common';
import { CreateAreaDto } from './dto/create-area.dto';
import { UpdateAreaDto } from './dto/update-area.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Area } from 'src/entities/area.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AreaService {
  constructor(
    @InjectRepository(Area)
    private areaRepo: Repository<Area>,
  ) {}

  create(createAreaDto: CreateAreaDto) {
    const area = this.areaRepo.create(createAreaDto);
    return this.areaRepo.save(area);
  }

  findAll() {
    return this.areaRepo.find({ relations: ['oficinas', 'empleados'] });
  }

  findOne(id: number) {
    return this.areaRepo.findOne({
      where: { id },
      relations: ['oficinas', 'empleados'],
    });
  }

  async update(id: number, updateAreaDto: UpdateAreaDto) {
    await this.areaRepo.update(id, updateAreaDto);
    return this.findOne(id);
  }

  remove(id: number) {
    return this.areaRepo.delete(id);
  }
}
