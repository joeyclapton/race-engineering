import { Module } from '@nestjs/common';
import { RaceService } from './race.service';
import { RaceController } from './race.controller';
import { UserService } from '../user/user.service';
import { DriverService } from '../driver/driver.service';
import { CircuitService } from '../circuit/circuit.service';
import { TeamService } from '../team/team.service';
import { ProxyService } from '../../notifications/proxy/proxy.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CircuitModule } from '../circuit/circuit.module';
import { Circuit } from '../circuit/models/circuit.entity';
import { Race } from './models/race.entity';
import { Driver } from '../driver/models/driver.entity';
import { DriverModule } from '../driver/driver.module';
import { TeamModule } from '../team/team.module';
import { Team } from '../team/models/team.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Race, Circuit, Driver, Team]),
    CircuitModule,
    DriverModule,
    TeamModule,
  ],
  controllers: [RaceController],
  providers: [
    RaceService,
    UserService,
    DriverService,
    CircuitService,
    TeamService,
    ProxyService,
  ],
})
export class RaceModule {}
