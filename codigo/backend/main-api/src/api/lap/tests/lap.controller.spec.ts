import { Test, TestingModule } from '@nestjs/testing';
import { LapController } from '../lap.controller';
import { LapService } from '../lap.service';
import {
  createLapMock,
  lapListMock,
  sendTimerMock,
  updatedLapMock,
  updateLapMock,
} from './lap.mock';

describe('LapController', () => {
  let lapController: LapController;
  let lapService: LapService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LapController],
      providers: [
        {
          provide: LapService,
          useValue: {
            create: jest.fn().mockResolvedValue(lapListMock[0]),
            findByRaceId: jest.fn().mockResolvedValue(lapListMock),
            findOneDetailed: jest.fn().mockResolvedValue(lapListMock[0]),
            update: jest.fn().mockResolvedValue(updatedLapMock),
            remove: jest.fn().mockResolvedValue(undefined),
            sendTimer: jest.fn().mockResolvedValue(updatedLapMock),
            findByRaceIdAndDriverId: jest
              .fn()
              .mockResolvedValue(lapListMock[0]),
          },
        },
      ],
    }).compile();

    lapController = module.get<LapController>(LapController);
    lapService = module.get<LapService>(LapService);
  });

  it('should be defined', () => {
    expect(lapController).toBeDefined();
    expect(lapService).toBeDefined();
  });

  describe('create', function () {
    it('should send create info to service', async function () {
      const res = await lapController.create('1', createLapMock);
      expect(res).toEqual(lapListMock[0]);
    });
  });

  describe('findByRace', function () {
    it('should send find info to service', async function () {
      const res = await lapController.findByRace('1');
      expect(res).toEqual(lapListMock);
    });
  });

  describe('findOneDetailed', function () {
    it('should send find info to service', async function () {
      const res = await lapController.findOne('1');
      expect(res).toEqual(lapListMock[0]);
    });
  });

  describe('update', function () {
    it('should send update info to service', async function () {
      const res = await lapController.update('1', updateLapMock);
      expect(res).toEqual(updatedLapMock);
    });
  });

  describe('remove', function () {
    it('should send remove info to service', async function () {
      const res = await lapController.remove('1');
      expect(res).toEqual(undefined);
    });
  });

  describe('sendTimer', function () {
    it('should send sendTimer info to service', async function () {
      const res = await lapController.sendTimer('1', sendTimerMock);
      expect(res).toEqual(updatedLapMock);
    });
  });

  describe('findByRaceAndDriver', function () {
    it('should send findByRaceAndDriver info to service', async function () {
      const res = await lapController.findByRaceAndDriver('1', '1');
      expect(res).toEqual(lapListMock[0]);
    });
  });
});
