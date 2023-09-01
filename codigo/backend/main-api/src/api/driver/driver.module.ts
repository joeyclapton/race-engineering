import { Module } from '@nestjs/common';
import { DriverService } from './driver.service';
import { DriverController } from './driver.controller';
import { LapService } from '../lap/lap.service';
import { RaceService } from '../race/race.service';
import { UserService } from '../user/user.service';
import { CircuitService } from '../circuit/circuit.service';
import { TeamService } from '../team/team.service';
import { ProxyService } from '../../notifications/proxy/proxy.service';
import { CircuitModule } from '../circuit/circuit.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Driver } from './models/driver.entity';
import { Circuit } from '../circuit/models/circuit.entity';
import { Race } from '../race/models/race.entity';
import { Team } from '../team/models/team.entity';
import { TeamModule } from '../team/team.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Driver, Circuit, Race, Team]),
    CircuitModule,
    TeamModule,
  ],
  controllers: [DriverController],
  providers: [
    DriverService,
    LapService,
    RaceService,
    UserService,
    CircuitService,
    TeamService,
    ProxyService,
  ],
})
export class DriverModule {}
