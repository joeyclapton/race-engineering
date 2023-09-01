import { DriverController } from '../driver.controller';
import { DriverService } from '../driver.service';
import { Test, TestingModule } from '@nestjs/testing';
import {
  driverListMock,
  updatedDriverMock,
  updateDriverMock,
} from './driver.mock';

describe('DriverController', () => {
  let driverController: DriverController;
  let driverService: DriverService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DriverController],
      providers: [
        {
          provide: DriverService,
          useValue: {
            create: jest.fn().mockResolvedValue(driverListMock[0]),
            findAll: jest.fn().mockResolvedValue(driverListMock),
            findByTeamId: jest.fn().mockResolvedValue(driverListMock),
            findOneDetailed: jest.fn().mockResolvedValue(driverListMock[0]),
            update: jest.fn().mockResolvedValue(updatedDriverMock),
            remove: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    driverController = module.get<DriverController>(DriverController);
    driverService = module.get<DriverService>(DriverService);
  });

  it('should be defined', () => {
    expect(driverController).toBeDefined();
    expect(driverService).toBeDefined();
  });

  describe('findAll', function () {
    it('should request all cars from service', async function () {
      driverController.findAll();
      expect(driverService.findAll).toBeCalled();
    });
  });

  describe('findByTeam', function () {
    it('should request all cars from service', async function () {
      driverController.findByTeam('1');
      expect(driverService.findByTeamId).toBeCalled();
    });
  });

  describe('findOneDetailed', function () {
    it('should request one car from service', async function () {
      driverController.findOne('1');
      expect(driverService.findOneDetailed).toBeCalledWith(1);
    });

    it('should throw an error if driver not found', async function () {
      jest
        .spyOn(driverService, 'findOneDetailed')
        .mockRejectedValue(new Error());
      await expect(driverController.findOne('1')).rejects.toThrow();
    });
  });

  describe('update', function () {
    it('should request update car from service', async function () {
      driverController.update('1', updateDriverMock);
      expect(driverService.update).toBeCalledWith(1, updateDriverMock);
    });
  });

  describe('remove', function () {
    it('should request remove car from service', async function () {
      driverController.remove('1');
      expect(driverService.remove).toBeCalledWith(1);
    });
  });
});
