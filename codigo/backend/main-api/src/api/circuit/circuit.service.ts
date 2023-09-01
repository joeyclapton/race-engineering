import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCircuitDto, UpdateCircuitDto } from './models/circuit.dto';
import { Circuit } from '../circuit/models/circuit.entity';

@Injectable()
export class CircuitService {
  constructor(
    @InjectRepository(Circuit)
    private readonly circuitRepository: Repository<Circuit>,
  ) {}

  async create(data: CreateCircuitDto) {
    return await this.circuitRepository.save(
      this.circuitRepository.create(data),
    );
  }

  async findAll(): Promise<Circuit[]> {
    return await this.circuitRepository.find();
  }

  async findOneOrFail(id: number): Promise<Circuit> {
    try {
      return await this.circuitRepository.findOneOrFail({
        where: { id, deletedAt: null },
      });
    } catch (error) {
      throw new NotFoundException({ message: 'Circuit not found' });
    }
  }

  async update(
    id: number,
    updateCircuitDto: UpdateCircuitDto,
  ): Promise<Circuit> {
    const circuit = await this.findOneOrFail(id);
    await this.circuitRepository.merge(circuit, updateCircuitDto);
    return await this.circuitRepository.save(circuit);
  }

  async remove(id: number): Promise<void> {
    await this.findOneOrFail(id);
    await this.circuitRepository.softDelete(id);
  }
}
