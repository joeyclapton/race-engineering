import { getEnvPath } from '../../common/helper/env.helper';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import { CarFactory } from './seeding/factories/car.factory';
import { CircuitFactory } from './seeding/factories/circuit.factory';
import { DriversFactory } from './seeding/factories/driver.factory';
import { LapFactory } from './seeding/factories/lap.factory';
import { RaceFactory } from './seeding/factories/race.factory';
import { TeamsFactory } from './seeding/factories/team.factory';
import { UserFactory } from './seeding/factories/user.factory';
import { MainSeeder } from './seeding/seeders/main.seeder';
import { Car } from '../../api/car/models/car.entity';
import { Circuit } from '../../api/circuit/models/circuit.entity';
import { Driver } from '../../api/driver/models/driver.entity';
import { Lap } from '../../api/lap/models/lap.entity';
import { Race } from '../../api/race/models/race.entity';
import { Team } from '../../api/team/models/team.entity';
import { User } from '../../api/user/models/user.entity';

const envFilePath: string = getEnvPath(`${__dirname}../../../common/envs`);
const data: any = dotenv.parse(fs.readFileSync(envFilePath));

export const config: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: data.DATABASE_HOST || 'localhost',
  port: data.DATABASE_PORT || 5432,
  database: data.DATABASE_NAME || 'race_engineering',
  username: data.DATABASE_USER || 'postgres',
  password: data.DATABASE_PASSWORD || 'docker',
  entities: [Car, Circuit, Driver, Lap, Race, Team, User],
  logger: 'file',
  synchronize: false,
  factories: [
    CarFactory,
    CircuitFactory,
    DriversFactory,
    LapFactory,
    RaceFactory,
    TeamsFactory,
    UserFactory,
  ],
  seeds: [MainSeeder],
};

export default new DataSource(config);
