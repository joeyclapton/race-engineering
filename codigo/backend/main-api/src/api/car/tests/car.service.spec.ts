import { getEnvPath } from '../../../common/helper/env.helper';
import { Car } from '../models/car.entity';
import { CreateCarDto } from '../models/car.dto';
import { CarService } from '../car.service';
import { createTestModule } from '../../../shared/testing/test.module';
import { UpdateResult } from 'typeorm';

const createCarDto: CreateCarDto = {
  totalFuel: 100,
  currentFuel: 100,
};

let carService: CarService;
let carTest: Car;

const envFilePath: string = getEnvPath(`${__dirname}/../../../common/envs`);

describe('CarService', () => {
  beforeAll(async () => {
    const module = await createTestModule();

    carService = module.get<CarService>(CarService);

    carTest = await carService.create(createCarDto);
  });

  describe('create', () => {
    it('Should create a new Car', async () => {
      const res = await carService.create(createCarDto);
      expect(res.totalFuel).toBe(createCarDto.totalFuel);
      expect(res.currentFuel).toBe(createCarDto.currentFuel);
    });
  });

  describe('findAll', () => {
    it('Should return an array of Cars', async () => {
      const res = await carService.findAll();
      expect(res).toBeInstanceOf(Array<Car>);
    });
  });

  describe('findOne', () => {
    it('Should return a Car', async () => {
      const res = await carService.findOneOrFail(carTest.id);
      expect(res).toBeInstanceOf(Car);
    });

    it('Should throw NotFoundException', async () => {
      await expect(carService.findOneOrFail(0)).rejects.toThrow();
    });
  });

  describe('update', () => {
    it('Should update a Car', async () => {
      const res = await carService.update(carTest.id, { totalFuel: 200 });
      expect(res.totalFuel).toBe(200);
    });
  });

  describe('remove', () => {
    it('Should remove a Car', async () => {
      const res = await carService.remove(carTest.id);
      expect(res).toBeInstanceOf(UpdateResult);
    });
  });

  afterAll(async () => {
    await Car.clear();
  });
});
