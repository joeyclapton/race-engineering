import { Motorcycle } from '../models/motorcycle.entity';

export const createMotorcycleMock = {
  totalFuel: 100,
  currentFuel: 100,
};

export const motorcycleList = [
  {
    id: 1,
    totalFuel: 100,
    currentFuel: 100,
  },
  {
    id: 2,
    totalFuel: 87,
    currentFuel: 40,
  },
];

export const updateMotorcycleMock = {
  totalFuel: 45,
  currentFuel: 100,
};

export const updatedMotorcycleMock = new Motorcycle({
  id: 1,
  totalFuel: 45,
  currentFuel: 100,
});
