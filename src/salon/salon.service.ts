import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSalonDto } from './dto/create-salon.dto';
import { UpdateSalonDto } from './dto/update-salon.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Salon } from 'src/entities/salon.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SalonService {
  constructor(
    @InjectRepository(Salon)
    private readonly salonRepository: Repository<Salon>,
  ) {}

  async create(createSalonDto: CreateSalonDto) {
    const findSalon = await this.findByCode(createSalonDto.codigo);
    if (findSalon && findSalon.codigo) {
      throw new HttpException(
        'Este código de salón ya se encuentra registrado',
        HttpStatus.CONFLICT,
      );
    }
    const salon = this.salonRepository.create(createSalonDto);
    return this.salonRepository.save(salon);
  }

  findAll() {
    return this.salonRepository.find();
  }

  findOne(id: number) {
    return this.salonRepository.findOne({ where: { id } });
  }

  findByCode(codigo: string) {
    return this.salonRepository.findOne({ where: { codigo } });
  }

  async update(id: number, updateSalonDto: UpdateSalonDto) {
    await this.salonRepository.update(id, updateSalonDto);
    return this.findOne(id);
  }

  remove(id: number) {
    return this.salonRepository.delete(id);
  }
}
