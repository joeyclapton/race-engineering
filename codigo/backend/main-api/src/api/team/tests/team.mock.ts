import { driverListMock } from '../../driver/tests/driver.mock';
import { Team } from '../models/team.entity';

export const teamListMock = [
  new Team({
    id: 1,
    name: 'Mercedes',
    category: 'F1',
    drivers: [],
  }),
  new Team({
    id: 2,
    name: 'Ferrari',
    category: 'F1',
    drivers: [],
  }),
];

export const createTeamMock = {
  name: 'Mercedes',
  category: 'F1',
};

export const updateTeamMock = {
  name: 'McLaren',
  category: 'F2',
};

export const updatedTeamMock = {
  id: 1,
  name: 'McLaren',
  category: 'F2',
};

export const teamWithDriverMock = {
  id: 1,
  name: 'Mercedes',
  category: 'F1',
  drivers: [driverListMock[0]],
};
