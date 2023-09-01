import { Injectable, NotFoundException } from '@nestjs/common';
import { IRequest, ListedUser, UpdateNameDto } from './models/user.dto';
import { Role, User } from './models/user.entity';
import { Race } from '../race/models/race.entity';
import { DriverService } from '../driver/driver.service';

@Injectable()
export class UserService {
  constructor(private readonly driverService: DriverService) {}

  public async updateUser(body: UpdateNameDto, user: User): Promise<User> {
    const userToUpdate = await User.findOne({ where: { id: user.id } });
    const { name, email } = body;

    if (name) userToUpdate.name = name;
    if (email) userToUpdate.email = body.email;

    return User.save(userToUpdate);
  }

  async findOneDetailed(id: number, role?): Promise<User> {
    const user = await User.findOne({
      where: { id, role },
      relations: ['driver', 'analystRaces', 'mechanicRaces'],
    });
    if (!user)
      throw new NotFoundException({
        message: 'User not found or invalid UserType!',
      });
    return user;
  }

  async findOne(id: number): Promise<User> {
    const user = await User.findOne({ where: { id } });
    if (!user) throw new NotFoundException({ message: 'User not found!' });
    return user;
  }

  async setAnalystMainRace(race: Race, userId: number) {
    const user = await this.findOneDetailed(userId, Role.Analyst);
    user.analystMainRace = race;
    return user.save();
  }

  async listMechanics(): Promise<ListedUser[]> {
    const mechanics = await User.find({ where: { role: Role.Mechanic } });
    return mechanics.map((mechanic) => {
      return { id: mechanic.id, name: mechanic.name };
    });
  }

  async listAnalysts(): Promise<ListedUser[]> {
    const analysts = await User.find({ where: { role: Role.Analyst } });
    return analysts.map((analyst) => {
      return { id: analyst.id, name: analyst.name };
    });
  }
}
