import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOficinaDto } from './dto/create-oficina.dto';
import { Oficina } from 'src/entities/oficina.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateSalonDto } from 'src/salon/dto/update-salon.dto';
import { Area } from 'src/entities/area.schema';

@Injectable()
export class OficinaService {
  constructor(
    @InjectModel(Oficina.name) private oficinaModel: Model<Oficina>,
    @InjectModel(Area.name) private areaModel: Model<Oficina>,
  ) {}

  async create(createOficinaDto: CreateOficinaDto): Promise<Oficina> {
    const findOficina = await this.findByCode(createOficinaDto.codigo);
    if (findOficina) {
      throw new HttpException(
        'Esta oficina ya se encuentra registrada',
        HttpStatus.CONFLICT,
      );
    }
    const oficina = new this.oficinaModel(createOficinaDto);
    const savedOficina = await oficina.save();
    await this.areaModel.findByIdAndUpdate(
      createOficinaDto.area,
      { $push: { oficinas: savedOficina._id } },
      { new: true },
    );

    return savedOficina;
  }

  async findAll(): Promise<Oficina[]> {
    return this.oficinaModel
      .find()
      .populate('area')
      .populate('empleados')
      .exec();
  }

  async findOne(id: string): Promise<Oficina> {
    const r = await this.oficinaModel
      .findById(id)
      .populate('area')
      .populate('empleados')
      .exec();
    if (!r) throw new NotFoundException('Oficina no encontrada');
    return r;
  }

  async findByCode(codigo: string): Promise<Oficina | null> {
    return this.oficinaModel.findOne({ codigo }).exec();
  }

  async update(id: string, updateOficinaDto: UpdateSalonDto): Promise<Oficina> {
    const oficina = await this.oficinaModel
      .findByIdAndUpdate(id, updateOficinaDto, { new: true })
      .exec();
    if (!oficina) {
      throw new NotFoundException(`Oficina con id ${id} no encontrada`);
    }
    return oficina;
  }

  async remove(id: string): Promise<Oficina> {
    const r = await this.oficinaModel.findByIdAndDelete(id).exec();
    if (!r) throw new NotFoundException('Área no encontrada');
    return r;
  }
}
