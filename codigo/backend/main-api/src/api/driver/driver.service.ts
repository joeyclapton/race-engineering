import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateDriverDTO } from './models/driver.dto';
import { Driver } from '../driver/models/driver.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class DriverService {
  constructor(
    @InjectRepository(Driver)
    private readonly driverRepository: Repository<Driver>,
  ) {}

  async findAll(page?: number) {
    if (!page) page = 1;
    const drivers = await this.driverRepository.find({
      where: { isActive: true },
      skip: (page - 1) * 25,
      take: 25,
      relations: ['user'],
    });
    return drivers.map((driver) => {
      return {
        id: driver.id,
        number: driver.number,
        isActive: driver.isActive,
        name: driver.user.name,
        email: driver.user.email,
      };
    });
  }

  async findByTeamId(id: number) {
    const drivers = await this.driverRepository.find({
      where: { team: { id } },
      relations: ['user'],
    });
    return drivers.map((driver) => {
      return {
        id: driver.id,
        number: driver.number,
        isActive: driver.isActive,
        name: driver.user.name,
        email: driver.user.email,
      };
    });
  }

  public async findOneDetailed(id: number) {
    try {
      return await this.driverRepository.findOneOrFail({
        where: { id },
        relations: ['team', 'user', 'firstPlaceRaces', 'races'],
      });
    } catch (error) {
      throw new NotFoundException('Driver not found');
    }
  }

  async update(id: number, body: UpdateDriverDTO) {
    const driver = await this.findOneOrFail(id);
    await this.driverRepository.merge(driver, body);
    return await this.driverRepository.save(driver);
  }

  async remove(id: number) {
    await this.findOneOrFail(id);
    await this.driverRepository.softDelete(id);
  }

  async findOneOrFail(id: number) {
    try {
      return await this.driverRepository.findOneOrFail({
        where: { id },
        relations: ['user'],
      });
    } catch (error) {
      throw new NotFoundException('Driver not found');
    }
  }
}
