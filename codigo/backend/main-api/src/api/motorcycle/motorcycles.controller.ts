import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
} from '@nestjs/common';
import { MotorcycleService } from './motorcycle.service';
import { CreateMotorcycleDto, UpdateMotorcycleDto } from '../motorcycle/models/motorcycle.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('motorcycles')
@ApiTags('Motorcycles')
export class MotorcycleController {
  constructor(private readonly motorcycleService: MotorcycleService) {}

  @Post()
  create(@Body() createMotorcycleDto: CreateMotorcycleDto) {
    return this.motorcycleService.create(createMotorcycleDto);
  }

  @Get()
  findAll() {
    return this.motorcycleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.motorcycleService.findOneOrFail(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMotorcycleDto: UpdateMotorcycleDto) {
    return this.motorcycleService.update(+id, updateMotorcycleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.motorcycleService.remove(+id);
  }
}
