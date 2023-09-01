import { Trim } from 'class-sanitizer';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Role, User } from '../../models/user.entity';

export class RegisterDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ type: 'string', example: 'John Doe' })
  public readonly name: string;

  @Trim()
  @IsEmail()
  @ApiProperty({ type: 'string', example: 'john@email.com' })
  public readonly email: string;

  @IsString()
  @MinLength(8)
  @ApiProperty({ type: 'string', example: 'password' })
  public readonly password: string;

  @IsString()
  @IsEnum(Role)
  @ApiProperty({ type: 'string', example: 'DRIVER', enum: Role })
  public readonly role: string;
}

export class LoginDto {
  @IsNotEmpty()
  @Trim()
  @IsEmail()
  @ApiProperty({ type: 'string', example: 'john@email.com' })
  public readonly email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: 'string', example: 'password' })
  public readonly password: string;
}

export interface AuthRequest extends Request {
  user: User;
}
