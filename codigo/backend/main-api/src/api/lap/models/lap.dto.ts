import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { TyreType } from '../../lap/models/lap.entity';

export class CreateLapDto {
  @IsNumber()
  @ApiPropertyOptional({ example: 10 })
  lapNumber?: number;

  @IsNumber()
  @ApiPropertyOptional({ example: 12 })
  driverId?: number;

  @IsString()
  @ApiPropertyOptional({ example: '00:01:20.345' })
  lapTime?: string;

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional({ example: 42 })
  remainingGas?: number;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ type: 'string', example: 'WET', enum: TyreType })
  tyreType?: string;

  @IsOptional()
  @IsBoolean()
  @ApiPropertyOptional({ example: true })
  isAdditional?: boolean;
}

export class UpdateLapDto extends PartialType(CreateLapDto) {}

export class SendTimerDto {
  @IsString()
  @ApiPropertyOptional({ example: '00:01:20.345' })
  lapTime?: string;
}

export class LapSearchParams {
  page: number;
  filter: string;
  sort: string;
  sortBy: string;
}
