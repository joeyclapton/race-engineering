import { getEnvPath } from '../../../common/helper/env.helper';
import { Motorcycle } from '../models/motorcycle.entity';
import { CreateMotorcycleDto } from '../models/motorcycle.dto';
import { MotorcycleService } from '../motorcycle.service';
import { createTestModule } from '../../../shared/testing/test.module';
import { UpdateResult } from 'typeorm';

const createMotorcycleDto: CreateMotorcycleDto = {
  totalFuel: 100,
  currentFuel: 100,
};

let motorcycleService: MotorcycleService;
let motorcycleTest: Motorcycle;

const envFilePath: string = getEnvPath(`${__dirname}/../../../common/envs`);

describe('MotorcycleService', () => {
  beforeAll(async () => {
    const module = await createTestModule();

    motorcycleService = module.get<MotorcycleService>(MotorcycleService);

    motorcycleTest = await motorcycleService.create(createMotorcycleDto);
  });

  describe('create', () => {
    it('Should create a new Motorcycle', async () => {
      const res = await motorcycleService.create(createMotorcycleDto);
      expect(res.totalFuel).toBe(createMotorcycleDto.totalFuel);
      expect(res.currentFuel).toBe(createMotorcycleDto.currentFuel);
    });
  });

  describe('findAll', () => {
    it('Should return an array of Motorcycles', async () => {
      const res = await motorcycleService.findAll();
      expect(res).toBeInstanceOf(Array<Motorcycle>);
    });
  });

  describe('findOne', () => {
    it('Should return a Motorcycle', async () => {
      const res = await motorcycleService.findOneOrFail(motorcycleTest.id);
      expect(res).toBeInstanceOf(Motorcycle);
    });

    it('Should throw NotFoundException', async () => {
      await expect(motorcycleService.findOneOrFail(0)).rejects.toThrow();
    });
  });

  describe('update', () => {
    it('Should update a Motorcycle', async () => {
      const res = await motorcycleService.update(motorcycleTest.id, { totalFuel: 200 });
      expect(res.totalFuel).toBe(200);
    });
  });

  describe('remove', () => {
    it('Should remove a Motorcycle', async () => {
      const res = await motorcycleService.remove(motorcycleTest.id);
      expect(res).toBeInstanceOf(UpdateResult);
    });
  });

  afterAll(async () => {
    await Motorcycle.clear();
  });
});
