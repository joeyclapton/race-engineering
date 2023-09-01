import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TeamService } from './team.service';
import { CreateTeamDto, UpdateTeamDto } from './models/team.dto';
import { ApiTags } from '@nestjs/swagger';
import { Team } from '../team/models/team.entity';

@Controller('teams')
@ApiTags('Teams')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Post()
  create(@Body() createTeamDto: CreateTeamDto): Promise<Team> {
    return this.teamService.create(createTeamDto);
  }

  @Get()
  findAll(): Promise<Team[]> {
    return this.teamService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Team> {
    return this.teamService.findOneDetailed(+id);
  }

  @Patch(':teamId/add-driver/:driverId')
  addDriver(
    @Param('teamId') teamId: string,
    @Param('driverId') driverId: string,
  ): Promise<Team> {
    return this.teamService.addDriver(+teamId, +driverId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTeamDto: UpdateTeamDto) {
    return this.teamService.update(+id, updateTeamDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teamService.remove(+id);
  }
}
