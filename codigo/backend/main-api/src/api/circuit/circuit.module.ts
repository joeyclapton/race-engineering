import { Module } from '@nestjs/common';
import { CircuitService } from './circuit.service';
import { CircuitController } from './circuit.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Circuit } from '../circuit/models/circuit.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Circuit])],
  controllers: [CircuitController],
  providers: [CircuitService],
})
export class CircuitModule {}
