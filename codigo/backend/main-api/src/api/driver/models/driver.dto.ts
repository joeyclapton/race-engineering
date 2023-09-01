import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class EditDriverDTO {
  @IsNumber()
  @ApiProperty({ example: 7 })
  number: number;

  @IsBoolean()
  @ApiProperty({ example: true })
  isActive: boolean;

  @IsString()
  @ApiProperty({ example: 'Brazilian' })
  nationality: string;
}

export class UpdateDriverDTO extends PartialType(EditDriverDTO) {}
