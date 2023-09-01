import { setSeederFactory } from 'typeorm-extension';
import { Driver } from '../../../../api/driver/models/driver.entity';
import { Faker } from '@faker-js/faker';

export const DriversFactory = setSeederFactory(Driver, (faker: Faker) => {
  const driver = new Driver();
  driver.number = faker.datatype.number();
  driver.isActive = faker.datatype.number({ min: 1, max: 100 }) <= 90;
  driver.nationality = faker.address.country();
  return driver;
});
