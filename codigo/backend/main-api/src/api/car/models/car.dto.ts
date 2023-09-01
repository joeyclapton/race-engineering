import { PartialType } from '@nestjs/mapped-types';
import { IsNumber } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCarDto {
  @IsNumber()
  @ApiPropertyOptional()
  totalFuel?: number;

  @IsNumber()
  @ApiPropertyOptional()
  currentFuel?: number;
}

export class UpdateCarDto extends PartialType(CreateCarDto) {}
