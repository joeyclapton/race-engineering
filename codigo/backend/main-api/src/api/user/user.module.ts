import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { User } from './models/user.entity';
import { UserService } from './user.service';
import { AuthModule } from './auth/auth.module';
import { DriverService } from '../driver/driver.service';
import { Driver } from '../driver/models/driver.entity';
import { DriverModule } from '../driver/driver.module';

@Module({
  imports: [TypeOrmModule.forFeature([User, Driver]), AuthModule, DriverModule],
  controllers: [UserController],
  providers: [UserService, DriverService],
})
export class UserModule {}
