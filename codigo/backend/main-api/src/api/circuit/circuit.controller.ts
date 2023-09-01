import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CircuitService } from './circuit.service';
import { CreateCircuitDto, UpdateCircuitDto } from './models/circuit.dto';
import { Circuit } from '../circuit/models/circuit.entity';
import { ApiBody, ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('circuits')
@ApiTags('Circuits')
export class CircuitController {
  constructor(private readonly circuitService: CircuitService) {}

  @Post()
  @ApiBody({ type: CreateCircuitDto })
  @ApiOkResponse({ description: 'The circuit was created successfully' })
  create(@Body() body: CreateCircuitDto): Promise<Circuit | never> {
    return this.circuitService.create(body);
  }

  @Get()
  @ApiResponse({ type: [Circuit], description: 'Successful operation' })
  findAll(): Promise<Circuit[]> {
    return this.circuitService.findAll();
  }

  @Get(':id')
  @ApiResponse({ type: Circuit, description: 'Successful operation' })
  findOne(@Param('id') id: string): Promise<Circuit> {
    return this.circuitService.findOneOrFail(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCircuitDto: UpdateCircuitDto,
  ): Promise<Circuit> {
    return this.circuitService.update(+id, updateCircuitDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.circuitService.remove(+id);
  }
}
