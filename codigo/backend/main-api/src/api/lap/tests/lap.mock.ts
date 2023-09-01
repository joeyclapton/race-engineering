import { Lap } from '../models/lap.entity';
import { driverListMock } from '../../driver/tests/driver.mock';
import * as parse from 'postgres-interval';

export const createLapMock = {
  lapNumber: 1,
  driverId: 1,
  lapTime: '00:01:20.345',
  remainingGas: 42,
  tyreType: 'WET',
  isAdditional: false,
};

export const updateLapMock = {
  lapNumber: 1,
  lapTime: '00:01:30.345',
  remainingGas: 23,
  tyreType: 'WET',
  isAdditional: false,
};

export const sendTimerMock = {
  lapTime: '00:01:20.345',
};

export const lapListMock = [
  new Lap({
    lapNumber: 1,
    driver: driverListMock[0],
    lapTime: parse('00:01:20.345'),
    remainingGas: 42,
    tyreType: 'WET',
    isAdditional: false,
  }),
];

export const updatedLapMock = new Lap({
  lapNumber: 1,
  driver: driverListMock[0],
  lapTime: parse('00:01:30.345'),
  remainingGas: 23,
  tyreType: 'WET',
  isAdditional: false,
});
