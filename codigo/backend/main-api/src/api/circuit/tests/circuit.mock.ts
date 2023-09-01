import { Circuit } from '../models/circuit.entity';
import { CreateCircuitDto, UpdateCircuitDto } from '../models/circuit.dto';

export const circuitListMock: Circuit[] = [
  new Circuit({
    name: 'Circuit of the Americas',
    local: 'Austin, Texas',
    trackSize: 5.513,
    safetyMargin: 0.5,
  }),
  new Circuit({
    name: 'Autódromo José Carlos Pace',
    local: 'São Paulo, Brazil',
    trackSize: 4.309,
    safetyMargin: 0.5,
  }),
  new Circuit({
    name: 'Autodromo Internazionale del Mugello',
    local: 'Mugello, Italy',
    trackSize: 5.245,
    safetyMargin: 0.5,
  }),
];

export const updatedCircuitMock: Circuit = new Circuit({
  name: 'Circuit of the Americas',
  local: 'Austin, Texas',
  trackSize: 10.513,
  safetyMargin: 0.5,
});

export const createCircuitMock: CreateCircuitDto = {
  local: 'Sao Paulo',
  name: 'Interlagos',
  safetyMargin: 5,
  trackSize: 10,
};

export const updateCircuitMock: UpdateCircuitDto = {
  trackSize: 10.513,
};
