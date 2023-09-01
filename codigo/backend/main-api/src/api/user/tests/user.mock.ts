import { Role } from '../models/user.entity';

export const analystsListMock = [
  {
    id: 1,
    name: 'Analyst 1',
    email: 'analyst1@email.com',
    password: '123456',
    role: Role.Analyst,
  },
];

export const mechanicsListMock = [
  {
    id: 1,
    name: 'Mechanic 1',
    email: 'mechanic1@email.com',
    password: '123456',
    role: Role.Mechanic,
  },
  {
    id: 2,
    name: 'Mechanic 2',
    email: 'mechanic2@email.com',
    password: '123456',
    role: Role.Mechanic,
  },
];

export const userDriverListMock = [
  {
    id: 1,
    name: 'Driver 1',
    email: 'driver1@email.com',
    password: '123456',
    role: Role.Driver,
  },
  {
    id: 2,
    name: 'Driver 2',
    email: 'driver2@email.com',
    password: '123456',
    role: Role.Driver,
  },
  {
    id: 3,
    name: 'Driver 3',
    email: 'driver3@email.com',
    password: '123456',
    role: Role.Driver,
  },
];

export const adminListMock = [
  {
    name: 'Admin 1',
    email: 'admin3@email.com',
    password: '123456',
    role: Role.Admin,
  },
];
