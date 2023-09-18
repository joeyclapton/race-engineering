import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MotorcycleService } from './motorcycle.service';
import { MotorcycleController } from './motorcycles.controller';
import { Motorcycle } from './models/motorcycle.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Motorcycle])],
  controllers: [MotorcycleController],
  providers: [MotorcycleService],
})
export class MotorcycleModule {}
