import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBody,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { RaceService } from './race.service';
import {
  CreateRaceDTO,
  RaceSearchParams,
  UpdateRaceDto,
} from './models/race.dto';
import { UserService } from '../user/user.service';
import { Race } from '../race/models/race.entity';
import { JwtGuard } from '../user/auth/guards/auth.guard';
import { RoleGuard } from '../user/auth/guards/role.guard';
import { Roles } from '../user/auth/decorators/role.decorator';
import { Role, User } from '../user/models/user.entity';
import { CurrentUser } from '../user/auth/decorators/user.decorator';

@Controller('races')
@ApiTags('Races')
export class RaceController {
  constructor(
    private readonly raceService: RaceService,
    private readonly userService: UserService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new race' })
  @Roles(Role.Admin)
  @UseGuards(JwtGuard, RoleGuard)
  @ApiBody({ type: CreateRaceDTO })
  @ApiOkResponse({ description: 'The race was created successfully' })
  @ApiNotFoundResponse({ description: 'The driver or mechanic does not exist' })
  create(@Body() createRaceDto: CreateRaceDTO): Promise<Race> {
    return this.raceService.create(createRaceDto);
  }

  @Get()
  @ApiOperation({ summary: 'List races' })
  @UseGuards(JwtGuard)
  findAll(@CurrentUser() user: User, @Query() searchParams?: RaceSearchParams) {
    return this.raceService.findAll(user, searchParams);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find one race' })
  findOne(@Param('id') id: string) {
    return this.raceService.findOneOrFail(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Edit one race' })
  update(@Param('id') id: string, @Body() updateRaceDto: UpdateRaceDto) {
    return this.raceService.update(+id, updateRaceDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove one race' })
  remove(@Param('id') id: string) {
    return this.raceService.remove(+id);
  }

  @Post(':id/set-main')
  @ApiOperation({ summary: 'Set a race as main-race (analyst only)' })
  @Roles(Role.Analyst)
  @UseGuards(JwtGuard, RoleGuard)
  async setMain(@Param('id') id: string, @CurrentUser() user: User) {
    const race = await this.raceService.findOneOrFail(+id);
    return this.userService.setAnalystMainRace(race, user.id);
  }

  @Get('driver/:id')
  @ApiOperation({ summary: 'List races by driver' })
  findByDriver(@Param('id') id: string) {
    return this.raceService.findByDriver(+id);
  }
}
