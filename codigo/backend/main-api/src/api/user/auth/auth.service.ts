import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, Role } from '../../user/models/user.entity';
import { Repository } from 'typeorm';
import { RegisterDto, LoginDto } from './models/auth.dto';
import { AuthHelper } from './auth.helper';
import { AuthResponse } from '../../user/auth/models/auth.interface';
import { Driver } from '../../driver/models/driver.entity';

@Injectable()
export class AuthService {
  @InjectRepository(User)
  private readonly userRepository: Repository<User>;

  @Inject(AuthHelper)
  private readonly helper: AuthHelper;

  public async register(body: RegisterDto): Promise<User | never> {
    const { name, email, password, role }: RegisterDto = body;
    let user: User = await this.userRepository.findOne({ where: { email } });

    if (user) {
      throw new ConflictException({
        message: 'Conflict: The email is already in use ',
      });
    }

    if (!Object.values(Role).includes(role as unknown as Role)) {
      throw new BadRequestException({
        message: 'The user type is not valid',
      });
    }

    user = new User();
    user.name = name;
    user.email = email;
    user.password = this.helper.encodePassword(password);
    user.role = role;
    user.createdAt = new Date();
    user.updatedAt = new Date();

    const userCreated = await this.userRepository.save(user);

    if (role === Role.Driver) {
      const driver = new Driver();
      driver.user = userCreated;
      driver.createdAt = new Date();
      driver.updatedAt = new Date();
      await Driver.save(driver);
    }
    return userCreated;
  }

  public async login(body: LoginDto): Promise<AuthResponse | never> {
    const { email, password }: LoginDto = body;
    const user: User = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new NotFoundException({
        message: 'Invalid email or password',
      });
    }

    const isPasswordValid: boolean = this.helper.isPasswordValid(
      password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new NotFoundException({
        message: 'Invalid email or password',
      });
    }

    await this.userRepository.update(user.id, { lastLoginAt: new Date() });
    const token = this.helper.generateToken(user);
    return { token };
  }

  public async refresh(user: User): Promise<AuthResponse> {
    await this.userRepository.update(user.id, { lastLoginAt: new Date() });
    const token = this.helper.generateToken(user);
    return { token };
  }
}
