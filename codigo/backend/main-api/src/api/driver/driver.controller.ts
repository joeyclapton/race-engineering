import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  Query,
} from '@nestjs/common';
import { DriverService } from './driver.service';
import { UpdateDriverDTO } from './models/driver.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('drivers')
@ApiTags('Drivers')
export class DriverController {
  constructor(private readonly driverService: DriverService) {}

  @Get()
  @ApiOperation({ summary: 'List drivers' })
  findAll(@Query('page') page?: string) {
    return this.driverService.findAll(parseInt(page));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find one Driver' })
  findOne(@Param('id') id: string) {
    return this.driverService.findOneDetailed(+id);
  }

  @Get('teams/:teamId')
  @ApiOperation({ summary: 'Find drivers by TeamId' })
  findByTeam(@Param('teamId') teamId: string) {
    return this.driverService.findByTeamId(+teamId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Edit Driver info' })
  update(@Param('id') id: string, @Body() updateDriverDto: UpdateDriverDTO) {
    return this.driverService.update(+id, updateDriverDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove Driver' })
  remove(@Param('id') id: string) {
    return this.driverService.remove(+id);
  }
}
