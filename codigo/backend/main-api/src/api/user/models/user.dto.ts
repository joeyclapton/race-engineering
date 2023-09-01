import { IsOptional, IsString } from 'class-validator';
import { User } from '../../user/models/user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateNameDto {
  @ApiProperty({ type: 'string', example: 'John Doe' })
  @IsString()
  @IsOptional()
  public readonly name?: string;

  @ApiProperty({ type: 'string', example: 'john@email.com' })
  @IsString()
  @IsOptional()
  public readonly email?: string;
}

export interface IRequest extends Request {
  user: User;
}

export class ListedUser {
  @ApiProperty({ type: 'number', example: 1 })
  id: number;

  @ApiProperty({ type: 'string', example: 'John Doe' })
  name: string;
}
