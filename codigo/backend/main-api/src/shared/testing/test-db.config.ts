import { getEnvPath } from '../../common/helper/env.helper';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import { DataSource, DataSourceOptions } from 'typeorm';
import { Car } from '../../api/car/models/car.entity';
import { Circuit } from '../../api/circuit/models/circuit.entity';
import { Driver } from '../../api/driver/models/driver.entity';
import { Lap } from '../../api/lap/models/lap.entity';
import { Race } from '../../api/race/models/race.entity';
import { Team } from '../../api/team/models/team.entity';
import { User } from '../../api/user/models/user.entity';

const envFilePath: string = getEnvPath(`${__dirname}../../../common/envs`);
const data: any = dotenv.parse(fs.readFileSync(envFilePath));

export const TestDataSource: DataSourceOptions = {
  type: 'postgres',
  host: data.TEST_DB_HOST,
  port: 5432,
  database: data.TEST_DB_NAME,
  username: data.TEST_DB_NAME,
  password: data.TEST_DB_PASSWORD,
  entities: [Car, Circuit, Driver, Lap, Race, Team, User],
};

export default new DataSource(TestDataSource);
