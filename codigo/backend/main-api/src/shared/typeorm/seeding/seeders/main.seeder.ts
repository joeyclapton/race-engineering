import {
  Seeder,
  SeederFactoryManager,
  setDataSourceOptions,
} from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { faker } from '@faker-js/faker/locale/pt_BR';
import { config } from '../../db.config';
import { Role, User } from '../../../../api/user/models/user.entity';
import { Driver } from '../../../../api/driver/models/driver.entity';
import { Car } from '../../../../api/car/models/car.entity';
import { Circuit } from '../../../../api/circuit/models/circuit.entity';
import { Lap } from '../../../../api/lap/models/lap.entity';
import { Race } from '../../../../api/race/models/race.entity';
import { Team } from '../../../../api/team/models/team.entity';

setDataSourceOptions(config, 'default');

export class MainSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    // Repositories
    const userRepository = dataSource.getRepository(User);
    const raceRepository = dataSource.getRepository(Race);
    const lapRepository = dataSource.getRepository(Lap);

    const userFactory = factoryManager.get(User);
    const driverFactory = factoryManager.get(Driver);

    // User Seeder
    await userFactory.save({
      role: Role.Admin,
      email: 'admin../../../..email.com',
    });
    const mechanics = await userFactory.saveMany(5, { role: Role.Mechanic });
    const analysts = await userFactory.saveMany(3, { role: Role.Analyst });

    // Team Seeder
    const teamFactory = factoryManager.get(Team);
    const teams = await teamFactory.saveMany(10);

    const drivers: Driver[] = [];
    const driversUsers = await userFactory.saveMany(20, { role: Role.Driver });
    let i = 0;
    for (const driverUser of driversUsers) {
      const driver = await driverFactory.save({
        user: driverUser,
        team: teams[i],
      });
      i++;
      if (i >= 10) i = 0;
      drivers.push(driver);
    }

    // Circuit Seeder
    const circuitFactory = factoryManager.get(Circuit);
    const circuits = await circuitFactory.saveMany(3);

    // Car Seeder
    const carFactory = factoryManager.get(Car);
    await carFactory.saveMany(20);

    // Race Seeder
    const raceFactory = factoryManager.get(Race);
    const races = await Promise.all(
      Array(10)
        .fill('')
        .map(async () => {
          return raceFactory.make({
            circuit: faker.helpers.arrayElement(circuits),
            analyst: faker.helpers.arrayElement(analysts),
            mechanics: faker.helpers.arrayElements(mechanics),
            drivers: faker.helpers.arrayElements(drivers),
            teams: faker.helpers.arrayElements(teams),
          });
        }),
    );
    await raceRepository.save(races);

    // Lap Seeder
    // -> Associate a Lap with Driver and Race
    const lapFactory = factoryManager.get(Lap);
    const laps = await Promise.all(
      Array(100)
        .fill('')
        .map(async () => {
          return lapFactory.make({
            driver: faker.helpers.arrayElement(drivers),
            race: faker.helpers.arrayElement(races),
          });
        }),
    );
    await lapRepository.save(laps);

    // Analysts Main Races Selection Seeder
    for (const analyst of analysts) {
      analyst.analystMainRace = faker.helpers.arrayElement(races);
      await userRepository.save(analyst);
    }
  }
}
