import {
  Body,
  Controller,
  Inject,
  Post,
  ClassSerializerInterceptor,
  UseInterceptors,
  UseGuards,
  Req,
} from '@nestjs/common';
import { User } from '../../user/models/user.entity';
import { RegisterDto, LoginDto } from './models/auth.dto';
import { AuthService } from './auth.service';
import { IRequest } from '../../user/models/user.dto';
import {
  ApiBody,
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthResponse } from '../../user/auth/models/auth.interface';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
@ApiTags('Authentication')
export class AuthController {
  @Inject(AuthService)
  private readonly service: AuthService;

  @Post('register')
  @ApiBody({ type: RegisterDto })
  @ApiOkResponse({
    type: User,
    description: 'The user was registered successfully',
  })
  @ApiConflictResponse({ description: 'Conflict: The email is already in use' })
  @UseInterceptors(ClassSerializerInterceptor)
  private register(@Body() body: RegisterDto): Promise<User | never> {
    return this.service.register(body);
  }

  @Post('login')
  @ApiBody({ type: LoginDto })
  @ApiOkResponse({ type: AuthResponse })
  @ApiNotFoundResponse({ description: 'Invalid email or password' })
  private login(@Body() body: LoginDto): Promise<AuthResponse | never> {
    return this.service.login(body);
  }

  @Post('refresh')
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: AuthResponse })
  private refresh(@Req() { user }: IRequest): Promise<AuthResponse | never> {
    return this.service.refresh(<User>user);
  }
}
