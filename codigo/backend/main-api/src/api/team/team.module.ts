import { Module } from '@nestjs/common';
import { TeamService } from './team.service';
import { TeamController } from './team.controller';
import { DriverService } from '../driver/driver.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Driver } from '../driver/models/driver.entity';
import { Team } from './models/team.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Team, Driver])],
  controllers: [TeamController],
  providers: [TeamService, DriverService],
})
export class TeamModule {}
