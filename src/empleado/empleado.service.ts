import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateEmpleadoDto } from './dto/create-empleado.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Empleado } from 'src/entities/empleado.schema';
import { Model } from 'mongoose';
import { UpdateEmpleadoDto } from './dto/update-empleado.dto';

@Injectable()
export class EmpleadoService {
  constructor(
    @InjectModel(Empleado.name) private empleadoModel: Model<Empleado>,
  ) {}

  async create(createEmpleadoDto: CreateEmpleadoDto): Promise<Empleado> {
    // validar documento único
    const existing = await this.empleadoModel.findOne({
      documento: createEmpleadoDto.documento,
    });
    if (existing) {
      throw new ConflictException(
        `El documento ${createEmpleadoDto.documento} ya está registrado`,
      );
    }

    if (
      createEmpleadoDto.tipoEmpleado !== 'profesor' &&
      createEmpleadoDto.tipoEmpleado !== 'administrativo'
    ) {
      throw new ConflictException('Tipo de empleado no válido');
    }

    const nuevoEmpleado = new this.empleadoModel(createEmpleadoDto);
    return nuevoEmpleado.save();
  }

  async findAll(): Promise<Empleado[]> {
    return this.empleadoModel
      .find()
      .populate('areaId')
      .populate('oficinaId')
      .exec();
  }

  async findOne(id: string): Promise<Empleado> {
    const empleado = await this.empleadoModel
      .findById(id)
      .populate('areaId')
      .populate('oficinaId')
      .exec();

    if (!empleado) {
      throw new NotFoundException(`Empleado con id ${id} no encontrado`);
    }
    return empleado;
  }

  async update(
    id: string,
    updateEmpleadoDto: UpdateEmpleadoDto,
  ): Promise<Empleado> {
    const empleado = await this.empleadoModel
      .findByIdAndUpdate(id, updateEmpleadoDto, { new: true })
      .exec();

    if (!empleado) {
      throw new NotFoundException(`Empleado con id ${id} no encontrado`);
    }
    return empleado;
  }

  async remove(id: string): Promise<Empleado> {
    const empleado = await this.empleadoModel.findByIdAndDelete(id).exec();
    if (!empleado) {
      throw new NotFoundException(`Empleado con id ${id} no encontrado`);
    }
    return empleado;
  }
}
