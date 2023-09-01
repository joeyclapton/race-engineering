import { Module } from '@nestjs/common';
import { LapService } from './lap.service';
import { LapController } from './lap.controller';
import { RaceService } from '../race/race.service';
import { DriverService } from '../driver/driver.service';
import { UserService } from '../user/user.service';
import { CircuitService } from '../circuit/circuit.service';
import { TeamService } from '../team/team.service';
import { ProxyService } from '../../notifications/proxy/proxy.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CircuitModule } from '../circuit/circuit.module';
import { Lap } from './models/lap.entity';
import { Circuit } from '../circuit/models/circuit.entity';
import { Driver } from '../driver/models/driver.entity';
import { DriverModule } from '../driver/driver.module';
import { RaceModule } from '../race/race.module';
import { Race } from '../race/models/race.entity';
import { Team } from '../team/models/team.entity';
import { TeamModule } from '../team/team.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Lap, Circuit, Driver, Race, Team]),
    CircuitModule,
    DriverModule,
    RaceModule,
    TeamModule,
  ],
  controllers: [LapController],
  providers: [
    LapService,
    RaceService,
    DriverService,
    UserService,
    CircuitService,
    TeamService,
    ProxyService,
  ],
})
export class LapModule {}
