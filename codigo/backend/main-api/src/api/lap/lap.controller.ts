import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { LapService } from './lap.service';
import { CreateLapDto, SendTimerDto, UpdateLapDto } from './models/lap.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('laps')
@ApiTags('Laps')
export class LapController {
  @Inject(LapService)
  private readonly lapService: LapService;

  @Post('race/:raceId')
  @ApiOperation({ summary: 'Create a new Lap for a Race' })
  create(@Param('raceId') raceId: string, @Body() createLapDto: CreateLapDto) {
    return this.lapService.create(+raceId, createLapDto);
  }

  @Get('race/:raceId')
  @ApiOperation({ summary: 'List laps by Race' })
  findByRace(@Param('raceId') raceId: string) {
    return this.lapService.findByRaceId(+raceId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find One Lap' })
  findOne(@Param('id') id: string) {
    return this.lapService.findOneDetailed(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Edit Lap' })
  update(@Param('id') id: string, @Body() updateLapDto: UpdateLapDto) {
    return this.lapService.update(+id, updateLapDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Send Timer (when lap ends)' })
  sendTimer(@Param('id') id: string, @Body() sendTimerDTO: SendTimerDto) {
    return this.lapService.sendTimer(+id, sendTimerDTO);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove lap' })
  remove(@Param('id') id: string) {
    return this.lapService.remove(+id);
  }

  @Get('race/:raceId/driver/:driverId')
  @ApiOperation({ summary: 'List laps by Race and Driver' })
  findByRaceAndDriver(
    @Param('raceId') raceId: string,
    @Param('driverId') driverId: string,
  ) {
    return this.lapService.findByRaceIdAndDriverId(+raceId, +driverId);
  }

  @Get('race/:raceId/team/:teamId')
  @ApiOperation({ summary: 'List laps by Race and Team' })
  findByRaceAndTeam(
    @Param('raceId') raceId: string,
    @Param('teamId') teamId: string,
  ) {
    return this.lapService.findByRaceIdAndTeamId(+raceId, +teamId);
  }

  @Get('driver/:driverId')
  @ApiOperation({ summary: 'List laps by Driver' })
  findByDriver(@Param('driverId') driverId: string) {
    return this.lapService.findByDriverId(+driverId);
  }

  @Get('team/:teamId')
  @ApiOperation({ summary: 'List laps by Team' })
  findByTeam(@Param('teamId') teamId: string) {
    return this.lapService.findByTeamId(+teamId);
  }
}
