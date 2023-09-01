import { setSeederFactory } from 'typeorm-extension';
import { faker } from '@faker-js/faker/locale/pt_BR';
import { Lap, TyreType } from '../../../../api/lap/models/lap.entity';
import * as parse from 'postgres-interval';

export const LapFactory = setSeederFactory(Lap, () => {
  const lap = new Lap();
  lap.remainingGas = faker.datatype.number({ min: 1, max: 100 });
  lap.tyreType = faker.helpers.arrayElement([TyreType.WET, TyreType.DRY]);
  lap.isAdditional = faker.datatype.number({ min: 1, max: 100 }) >= 90;
  lap.lapNumber = faker.datatype.number({ min: 1, max: 70 });
  const minutes = faker.datatype.number({ min: 1, max: 3 });
  const seconds = faker.datatype.number({ min: 1, max: 59 });
  const milliseconds = faker.datatype.number({ min: 100, max: 999 });
  lap.lapTime = parse(
    `00:0${minutes}:${seconds < 10 ? 0 : ''}${seconds}.${milliseconds}`,
  );
  return lap;
});
