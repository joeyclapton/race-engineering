import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLapDto, SendTimerDto, UpdateLapDto } from './models/lap.dto';
import { Lap } from '../lap/models/lap.entity';
import { RaceService } from '../race/race.service';
import { DriverService } from '../driver/driver.service';
import { TeamService } from '../team/team.service';
import * as parse from 'postgres-interval';

@Injectable()
export class LapService {
  constructor(
    private readonly raceService: RaceService,
    private readonly driverService: DriverService,
    private readonly teamService: TeamService,
  ) {}

  async create(raceId: number, createLapDto: CreateLapDto) {
    const {
      lapNumber,
      driverId,
      lapTime,
      remainingGas,
      tyreType,
      isAdditional,
    } = createLapDto;
    const race = await this.raceService.findOneOrFail(raceId);
    let driver;
    if (driverId) driver = await this.driverService.findOneOrFail(driverId);

    const lap = new Lap();
    lap.lapNumber = lapNumber;
    if (lapTime) lap.lapTime = parse(lapTime);
    if (driver) lap.driver = driver;
    if (remainingGas) lap.remainingGas = remainingGas;
    if (tyreType) lap.tyreType = tyreType;
    if (isAdditional) lap.isAdditional = isAdditional;
    lap.race = race;
    lap.createdAt = new Date();
    lap.updatedAt = new Date();

    return await lap.save();
  }

  async findByRaceId(id: number) {
    const race = await this.raceService.findOneOrFail(id);
    return await Lap.find({
      where: {
        race: { id: race.id },
      },
    });
  }

  async findByDriverId(id: number) {
    const driver = await this.driverService.findOneDetailed(id);
    return await Lap.find({
      where: {
        driver: { id: driver.id },
      },
      relations: ['race'],
    });
  }

  async findByTeamId(id: number) {
    const team = await this.teamService.findOneOrFail(id);
    return await Lap.find({
      where: {
        driver: { team: { id: team.id } },
      },
      relations: ['driver'],
    });
  }

  async findByRaceIdAndDriverId(raceId: number, driverId: number) {
    const driver = await this.driverService.findOneDetailed(driverId);
    const race = await this.raceService.findOneOrFail(raceId);
    const laps = await Lap.find({
      where: {
        driver: { id: driver.id },
        race: { id: race.id },
      },
      relations: ['driver', 'race'],
    });
    return laps.map((lap) => {
      delete lap.driver;
      delete lap.race;
      return lap;
    });
  }

  async findByRaceIdAndTeamId(raceId: number, teamId: number) {
    const team = await this.teamService.findOneOrFail(teamId);
    const race = await this.raceService.findOneOrFail(raceId);
    const laps = await Lap.find({
      where: {
        driver: { team: { id: team.id } },
        race: { id: race.id },
      },
      relations: ['driver', 'race'],
    });
    return laps.map((lap) => {
      delete lap.driver;
      delete lap.race;
      return lap;
    });
  }

  async findOne(id: number) {
    const lap = await Lap.findOne({ where: { id } });
    if (!lap) throw new NotFoundException(`Lap #${id} not found`);
    return lap;
  }

  async findOneDetailed(id: number) {
    const lap = await Lap.findOne({
      where: { id },
      relations: ['driver', 'race'],
    });
    if (!lap) throw new NotFoundException(`Lap #${id} not found`);
    return lap;
  }

  async update(id: number, updateLapDto: UpdateLapDto) {
    const {
      lapTime,
      lapNumber,
      driverId,
      remainingGas,
      tyreType,
      isAdditional,
    } = updateLapDto;
    const lap = await this.findOne(id);
    if (lapTime) lap.lapTime = parse(lapTime);
    if (lapNumber) lap.lapNumber = lapNumber;
    if (driverId) lap.driver = await this.driverService.findOneOrFail(driverId);
    if (remainingGas) lap.remainingGas = remainingGas;
    if (tyreType) lap.tyreType = tyreType;
    if (isAdditional) lap.isAdditional = isAdditional;

    return await lap.save();
  }

  async sendTimer(id: number, sendTimerDto: SendTimerDto) {
    const { lapTime } = sendTimerDto;
    const lap = await this.findOne(id);
    if (lapTime) lap.lapTime = parse(lapTime);
    return await lap.save();
  }

  async remove(id: number) {
    const lap = await this.findOne(id);
    return await lap.softRemove();
  }
}
