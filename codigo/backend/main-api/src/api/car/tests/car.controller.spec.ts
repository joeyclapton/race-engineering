import { CarController } from '../car.controller';
import { CarService } from '../car.service';
import { Test, TestingModule } from '@nestjs/testing';
import { carList, createCarMock, updateCarMock } from './car.mock';

describe('CarController', () => {
  let carController: CarController;
  let carService: CarService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CarController],
      providers: [
        {
          provide: CarService,
          useValue: {
            create: jest.fn().mockResolvedValue(carList[0]),
            findAll: jest.fn().mockResolvedValue(carList),
            findOneOrFail: jest.fn().mockResolvedValue(carList[0]),
            update: jest.fn().mockResolvedValue(updateCarMock),
            remove: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    carController = module.get<CarController>(CarController);
    carService = module.get<CarService>(CarService);
  });

  it('should be defined', () => {
    expect(carController).toBeDefined();
    expect(carService).toBeDefined();
  });

  describe('create', function () {
    it('should send create info to service', async function () {
      carController.create(createCarMock);
      expect(carService.create).toBeCalledWith(createCarMock);
    });
  });

  describe('findAll', function () {
    it('should request all cars from service', async function () {
      carController.findAll();
      expect(carService.findAll).toBeCalled();
    });
  });

  describe('findOne', function () {
    it('should request one car from service', async function () {
      carController.findOne('1');
      expect(carService.findOneOrFail).toBeCalledWith(1);
    });
  });

  describe('update', function () {
    it('should request update car from service', async function () {
      carController.update('1', updateCarMock);
      expect(carService.update).toBeCalledWith(1, updateCarMock);
    });
  });

  describe('remove', function () {
    it('should request remove car from service', async function () {
      carController.remove('1');
      expect(carService.remove).toBeCalledWith(1);
    });
  });
});
