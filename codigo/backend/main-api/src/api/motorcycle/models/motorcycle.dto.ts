import { PartialType } from '@nestjs/mapped-types';
import { IsNumber } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class CreateMotorcycleDto {
  @IsNumber()
  @ApiPropertyOptional()
  totalFuel?: number;

  @IsNumber()
  @ApiPropertyOptional()
  currentFuel?: number;
}

export class UpdateMotorcycleDto extends PartialType(CreateMotorcycleDto) {}
