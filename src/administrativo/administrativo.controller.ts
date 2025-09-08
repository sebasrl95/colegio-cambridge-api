import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AdministrativoService } from './administrativo.service';
import { CreateAdministrativoDto } from './dto/create-administrativo.dto';
import { UpdateAdministrativoDto } from './dto/update-administrativo.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('administrativo')
@Controller('administrativo')
export class AdministrativoController {
  constructor(private readonly administrativoService: AdministrativoService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Administrativo creado exitosamente.',
  })
  create(@Body() createAdministrativoDto: CreateAdministrativoDto) {
    return this.administrativoService.create(createAdministrativoDto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Lista todos los administrativos.' })
  findAll() {
    return this.administrativoService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Devuelve un administrativo por su ID.',
  })
  findOne(@Param('id') id: string) {
    return this.administrativoService.findOne(+id);
  }

  @Patch(':id')
  @ApiResponse({ status: 200, description: 'Actualiza un administrativo.' })
  update(
    @Param('id') id: string,
    @Body() updateAdministrativoDto: UpdateAdministrativoDto,
  ) {
    return this.administrativoService.update(+id, updateAdministrativoDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Elimina un administrativo.' })
  remove(@Param('id') id: string) {
    return this.administrativoService.remove(+id);
  }
}
