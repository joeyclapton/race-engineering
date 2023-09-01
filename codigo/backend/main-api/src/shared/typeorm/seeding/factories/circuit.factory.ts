import { setSeederFactory } from 'typeorm-extension';
import { faker } from '@faker-js/faker/locale/pt_BR';
import { Circuit } from '../../../../api/circuit/models/circuit.entity';

export const CircuitFactory = setSeederFactory(Circuit, () => {
  const circuit = new Circuit();

  const name_local = [
    { name: 'Velocitta', local: 'Mogi Guaçu' },
    { name: 'Interlagos', local: 'São Paulo' },
    { name: 'Goiania', local: 'Goiania' },
  ];

  const fakeNameLocal = faker.helpers.arrayElement(name_local);
  circuit.name = fakeNameLocal.name;
  circuit.local = fakeNameLocal.local;
  circuit.safetyMargin = faker.datatype.number({ min: 1, max: 5 });
  circuit.trackSize = faker.datatype.number({
    min: 5,
    max: 10,
    precision: 0.01,
  });
  return circuit;
});
