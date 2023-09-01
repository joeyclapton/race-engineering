import { Car } from '../models/car.entity';

export const createCarMock = {
  totalFuel: 100,
  currentFuel: 100,
};

export const carList = [
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

export const updateCarMock = {
  totalFuel: 45,
  currentFuel: 100,
};

export const updatedCarMock = new Car({
  id: 1,
  totalFuel: 45,
  currentFuel: 100,
});
