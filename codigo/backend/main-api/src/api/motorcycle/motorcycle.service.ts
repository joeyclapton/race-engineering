import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMotorcycleDto, UpdateMotorcycleDto } from '../motorcycle/models/motorcycle.dto';
import { Motorcycle } from '../motorcycle/models/motorcycle.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MotorcycleService {
  constructor(
    @InjectRepository(Motorcycle)
    private readonly motorcycleRepository: Repository<Motorcycle>,
  ) {}

  async create(createMotorcycleDto: CreateMotorcycleDto): Promise<Motorcycle> {
    return await this.motorcycleRepository.save(
      this.motorcycleRepository.create(createMotorcycleDto),
    );
  }

  async findAll(): Promise<Motorcycle[]> {
    return await this.motorcycleRepository.find({ order: { createdAt: 'DESC' } });
  }

  async findOneOrFail(id: number): Promise<Motorcycle> {
    try {
      return await this.motorcycleRepository.findOneOrFail({ where: { id } });
    } catch (error) {
      throw new NotFoundException({ message: 'Motorcycle not found' });
    }
  }

  async update(id: number, updateMotorcycleDto: UpdateMotorcycleDto) {
    const motorcycle = await this.findOneOrFail(id);
    await this.motorcycleRepository.merge(motorcycle, updateMotorcycleDto);
    return await this.motorcycleRepository.save(motorcycle);
  }

  async remove(id: number) {
    const motorcycle = await this.findOneOrFail(id);
    return await this.motorcycleRepository.softDelete({ id });
  }
}
