import { MotorcycleController } from '../motorcycles.controller';
import { MotorcycleService } from '../motorcycle.service';
import { Test, TestingModule } from '@nestjs/testing';
import { motorcycleList, createMotorcycleMock, updateMotorcycleMock } from './motorcycles.mock';

describe('MotorcycleController', () => {
  let motorcycleController: MotorcycleController;
  let motorcycleService: MotorcycleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MotorcycleController],
      providers: [
        {
          provide: MotorcycleService,
          useValue: {
            create: jest.fn().mockResolvedValue(motorcycleList[0]),
            findAll: jest.fn().mockResolvedValue(motorcycleList),
            findOneOrFail: jest.fn().mockResolvedValue(motorcycleList[0]),
            update: jest.fn().mockResolvedValue(updateMotorcycleMock),
            remove: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    motorcycleController = module.get<MotorcycleController>(MotorcycleController);
    motorcycleService = module.get<MotorcycleService>(MotorcycleService);
  });

  it('should be defined', () => {
    expect(motorcycleController).toBeDefined();
    expect(motorcycleService).toBeDefined();
  });

  describe('create', function () {
    it('should send create info to service', async function () {
      motorcycleController.create(createMotorcycleMock);
      expect(motorcycleService.create).toBeCalledWith(createMotorcycleMock);
    });
  });

  describe('findAll', function () {
    it('should request all motorcycles from service', async function () {
      motorcycleController.findAll();
      expect(motorcycleService.findAll).toBeCalled();
    });
  });

  describe('findOne', function () {
    it('should request one motorcycle from service', async function () {
      motorcycleController.findOne('1');
      expect(motorcycleService.findOneOrFail).toBeCalledWith(1);
    });
  });

  describe('update', function () {
    it('should request update motorcycle from service', async function () {
      motorcycleController.update('1', updateMotorcycleMock);
      expect(motorcycleService.update).toBeCalledWith(1, updateMotorcycleMock);
    });
  });

  describe('remove', function () {
    it('should request remove motorcycle from service', async function () {
      motorcycleController.remove('1');
      expect(motorcycleService.remove).toBeCalledWith(1);
    });
  });
});
