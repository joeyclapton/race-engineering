import { setSeederFactory } from 'typeorm-extension';
import { Race } from '../../../../api/race/models/race.entity';
import { faker } from '@faker-js/faker/locale/pt_BR';

export const RaceFactory = setSeederFactory(Race, () => {
  const race = new Race();
  const orders = [
    'First',
    'Second',
    'Third',
    'Fourth',
    'Fifth',
    'Sixth',
    'Seventh',
    'Eighth',
    'Ninth',
    'Last',
  ];
  race.name = faker.helpers.arrayElement(orders) + ' Race';
  race.startDate = faker.date.between('2023-01-01', '2023-12-31');
  race.endDate = faker.date.soon(2, race.startDate);
  race.totalLaps = faker.datatype.number({ min: 30, max: 70 });
  return race;
});
