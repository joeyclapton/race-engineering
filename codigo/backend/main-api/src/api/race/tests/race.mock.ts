import { CreateRaceDTO } from '../models/race.dto';
import { Race } from '../models/race.entity';
import { driverListMock } from '../../driver/tests/driver.mock';
import { teamListMock } from '../../team/tests/team.mock';
import {
  analystsListMock,
  mechanicsListMock,
} from '../../user/tests/user.mock';
import { circuitListMock } from '../../circuit/tests/circuit.mock';
import { User } from '../../user/models/user.entity';

// Mock USERS

export const createRaceMock: CreateRaceDTO = {
  name: 'First race',
  startDate: new Date('2023-04-03T08:00:00.000Z'),
  endDate: new Date('2023-04-03T08:00:00.000Z'),
  totalLaps: 50,
  circuitId: 1,
  analystId: 1,
  mechanics: [{ id: 1 }],
  drivers: [{ id: 1 }],
  teams: [{ id: 1 }],
};

export const raceListMock = [
  new Race({
    id: 1,
    name: 'First race',
    startDate: new Date('2023-04-03T08:00:00.000Z'),
    endDate: new Date('2023-04-03T08:00:00.000Z'),
    totalLaps: 50,
    circuit: circuitListMock[0],
    analyst: new User(analystsListMock[0]),
    mechanics: [new User(mechanicsListMock[0])],
    drivers: driverListMock,
    teams: teamListMock,
  }),
  new Race({
    id: 2,
    name: 'Second race',
    startDate: new Date('2023-04-03T08:00:00.000Z'),
    endDate: new Date('2023-04-03T08:00:00.000Z'),
    totalLaps: 50,
    circuit: circuitListMock[0],
    analyst: new User(analystsListMock[0]),
    mechanics: [new User(mechanicsListMock[0])],
    drivers: driverListMock,
    teams: teamListMock,
  }),
];

export const updateRaceMock = {
  name: 'Updated Race',
  totalLaps: 12,
};

export const updatedRaceMock = {
  id: 2,
  name: 'Second race',
  startDate: new Date('2023-04-03T08:00:00.000Z'),
  endDate: new Date('2023-04-03T08:00:00.000Z'),
  totalLaps: 50,
  circuit: circuitListMock[0],
  analyst: analystsListMock[0],
  mechanics: mechanicsListMock,
  drivers: driverListMock,
  teams: teamListMock,
};

export const searchParamsMock = {
  search: '',
  sort: '',
  page: 10,
};
