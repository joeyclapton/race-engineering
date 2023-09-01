import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTeamDto, UpdateTeamDto } from './models/team.dto';
import { Team } from '../team/models/team.entity';
import { DriverService } from '../driver/driver.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(Team) private readonly teamRepository: Repository<Team>,
    public readonly driverService: DriverService,
  ) {}

  async create(body: CreateTeamDto): Promise<Team> {
    return await this.teamRepository.save(this.teamRepository.create(body));
  }

  async findAll(): Promise<Team[]> {
    return await this.teamRepository.find({ relations: ['drivers', 'cars'] });
  }

  async findOneOrFail(id: number) {
    try {
      return await this.teamRepository.findOneOrFail({ where: { id } });
    } catch (error) {
      throw new NotFoundException({ message: 'Team not found' });
    }
  }

  async findOneDetailed(id: number): Promise<Team> {
    try {
      return await this.teamRepository.findOneOrFail({
        where: { id },
        relations: ['drivers', 'cars'],
      });
    } catch (error) {
      throw new NotFoundException({ message: 'Team not found' });
    }
  }

  async update(id: number, body: UpdateTeamDto): Promise<Team> {
    const team = await this.findOneOrFail(id);
    await this.teamRepository.merge(team, body);
    return await this.teamRepository.save(team);
  }

  async remove(id: number): Promise<void> {
    await this.findOneOrFail(id);
    await this.teamRepository.softDelete(id);
  }

  async addDriver(teamId: number, driverId: number): Promise<Team> {
    const team = await this.findOneDetailed(teamId);
    const driver = await this.driverService.findOneDetailed(driverId);
    team.drivers.push(driver);
    return await this.teamRepository.save(team);
  }
}
