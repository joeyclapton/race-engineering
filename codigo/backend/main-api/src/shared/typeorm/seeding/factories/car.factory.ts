import { setSeederFactory } from 'typeorm-extension';
import { faker } from '@faker-js/faker/locale/pt_BR';
import { Car } from '../../../../api/car/models/car.entity';

export const CarFactory = setSeederFactory(Car, () => {
  const car = new Car();
  car.totalFuel = faker.datatype.number({ min: 50, max: 100 });
  car.currentFuel = car.totalFuel;
  return car;
});
