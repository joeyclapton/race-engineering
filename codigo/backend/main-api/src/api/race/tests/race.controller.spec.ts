import { Test, TestingModule } from '@nestjs/testing';
import { RaceController } from '../race.controller';
import { RaceService } from '../race.service';
import {
  createRaceMock,
  raceListMock,
  searchParamsMock,
  updatedRaceMock,
  updateRaceMock,
} from './race.mock';
import {
  analystsListMock,
  userDriverListMock,
} from '../../user/tests/user.mock';
import { NotFoundException } from '@nestjs/common';
import { UserService } from '../../user/user.service';
import { User } from '../../user/models/user.entity';

describe('RaceController', () => {
  let raceController: RaceController;
  let raceService: RaceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RaceController],
      providers: [
        {
          provide: RaceService,
          useValue: {
            create: jest.fn().mockResolvedValue(raceListMock[0]),
            findAll: jest.fn().mockResolvedValue(raceListMock),
            findOneOrFail: jest.fn().mockResolvedValue(raceListMock[0]),
            update: jest.fn().mockResolvedValue(updatedRaceMock),
            remove: jest.fn().mockResolvedValue(undefined),
          },
        },
        {
          provide: UserService,
          useValue: {
            setAnalystMainRace: jest
              .fn()
              .mockResolvedValue(analystsListMock[0]),
          },
        },
      ],
    }).compile();

    raceController = module.get<RaceController>(RaceController);
    raceService = module.get<RaceService>(RaceService);
  });

  it('should be defined', () => {
    expect(raceController).toBeDefined();
    expect(raceService).toBeDefined();
  });

  describe('create', function () {
    it('should send create info to service', async function () {
      const res = await raceController.create(createRaceMock);
      expect(res).toEqual(raceListMock[0]);
    });
  });

  describe('findAll', function () {
    it('should request all cars from service', async function () {
      const res = await raceController.findAll(
        new User(userDriverListMock[0]),
        searchParamsMock,
      );
      expect(res).toEqual(raceListMock);
    });
  });

  describe('findOne', function () {
    it('should request one car from service', async function () {
      const res = await raceController.findOne('1');
      expect(res).toEqual(raceListMock[0]);
    });

    it('should throw an error when race is not found', async function () {
      jest
        .spyOn(raceService, 'findOneOrFail')
        .mockRejectedValue(new NotFoundException());
      await expect(raceController.findOne('1')).rejects.toThrowError();
    });
  });

  describe('update', function () {
    it('should send update info to service', async function () {
      const res = await raceController.update('1', updateRaceMock);
      expect(raceService.update).toBeCalledWith(1, updateRaceMock);
      expect(res).toEqual(updatedRaceMock);
    });
  });

  describe('remove', function () {
    it('should send remove info to service', async function () {
      await raceController.remove('1');
      expect(raceService.remove).toBeCalledWith(1);
    });
  });
});
