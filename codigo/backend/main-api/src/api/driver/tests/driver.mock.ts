import { userDriverListMock } from '../../user/tests/user.mock';
import { Driver } from '../models/driver.entity';
import { User } from '../../user/models/user.entity';

export const driverListMock = [
  new Driver({
    id: 1,
    number: 12,
    isActive: true,
    user: new User(userDriverListMock[0]),
  }),
  new Driver({
    id: 2,
    number: 13,
    isActive: true,
    user: new User(userDriverListMock[1]),
  }),
];

export const driverListResultMock = [
  {
    id: 1,
    number: 12,
    isActive: true,
    name: 'lucas',
    email: 'lucas@email.com',
  },
  {
    id: 2,
    number: 13,
    isActive: true,
    name: 'pedro',
    email: 'pedro@email.com',
  },
];

export const updateDriverMock = {
  number: 24,
};

export const updatedDriverMock = {
  id: 1,
  number: 24,
  isActive: true,
  nationality: 'Brazil',
  bestLapTime: 132,
  bestRaceTime: 120,
  totalRaceTime: 1200,
  totalRaceKm: 12043,
};
