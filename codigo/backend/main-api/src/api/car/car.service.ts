import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCarDto, UpdateCarDto } from '../car/models/car.dto';
import { Car } from '../car/models/car.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CarService {
  constructor(
    @InjectRepository(Car)
    private readonly carRepository: Repository<Car>,
  ) {}

  async create(createCarDto: CreateCarDto): Promise<Car> {
    return await this.carRepository.save(
      this.carRepository.create(createCarDto),
    );
  }

  async findAll(): Promise<Car[]> {
    return await this.carRepository.find({ order: { createdAt: 'DESC' } });
  }

  async findOneOrFail(id: number): Promise<Car> {
    try {
      return await this.carRepository.findOneOrFail({ where: { id } });
    } catch (error) {
      throw new NotFoundException({ message: 'Car not found' });
    }
  }

  async update(id: number, updateCarDto: UpdateCarDto) {
    const car = await this.findOneOrFail(id);
    await this.carRepository.merge(car, updateCarDto);
    return await this.carRepository.save(car);
  }

  async remove(id: number) {
    const car = await this.findOneOrFail(id);
    return await this.carRepository.softDelete({ id });
  }
}
