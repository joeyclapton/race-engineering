import { CircuitController } from '../circuit.controller';
import { CircuitService } from '../circuit.service';
import { Test, TestingModule } from '@nestjs/testing';
import {
  circuitListMock,
  createCircuitMock,
  updateCircuitMock,
} from './circuit.mock';

describe('CircuitController', () => {
  let circuitController: CircuitController;
  let circuitService: CircuitService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CircuitController],
      providers: [
        {
          provide: CircuitService,
          useValue: {
            create: jest.fn().mockResolvedValue(circuitListMock[0]),
            findAll: jest.fn().mockResolvedValue(circuitListMock),
            findOneOrFail: jest.fn().mockResolvedValue(circuitListMock[0]),
            update: jest.fn().mockResolvedValue(updateCircuitMock),
            remove: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    circuitController = module.get<CircuitController>(CircuitController);
    circuitService = module.get<CircuitService>(CircuitService);
  });

  it('should be defined', () => {
    expect(circuitController).toBeDefined();
    expect(circuitService).toBeDefined();
  });

  describe('create', function () {
    it('should send create info to service', async function () {
      circuitController.create(createCircuitMock);
      expect(circuitService.create).toBeCalledWith(createCircuitMock);
    });
  });

  describe('findAll', function () {
    it('should request all cars from service', async function () {
      circuitController.findAll();
      expect(circuitService.findAll).toBeCalled();
    });
  });

  describe('findOne', function () {
    it('should request one car from service', async function () {
      circuitController.findOne('1');
      expect(circuitService.findOneOrFail).toBeCalledWith(1);
    });
  });

  describe('update', function () {
    it('should request update car from service', async function () {
      circuitController.update('1', updateCircuitMock);
      expect(circuitService.update).toBeCalledWith(1, updateCircuitMock);
    });
  });

  describe('remove', function () {
    it('should request remove car from service', async function () {
      circuitController.remove('1');
      expect(circuitService.remove).toBeCalledWith(1);
    });
  });
});
