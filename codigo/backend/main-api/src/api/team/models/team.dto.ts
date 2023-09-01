import { PartialType } from '@nestjs/mapped-types';
import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTeamDto {
  @IsString()
  @ApiProperty({ example: 'Team 1' })
  name: string;

  @IsString()
  @ApiProperty({ example: 'Category A' })
  category: string;
}

export class UpdateTeamDto extends PartialType(CreateTeamDto) {}

export class AddDriverDTO {
  driverId: string;
}
