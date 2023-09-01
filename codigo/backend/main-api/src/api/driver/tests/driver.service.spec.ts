import { Test, TestingModule } from '@nestjs/testing';
import { DriverService } from '../driver.service';
import { Driver } from '../models/driver.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  driverListMock,
  driverListResultMock,
  updatedDriverMock,
  updateDriverMock,
} from './driver.mock';

describe('DriverService', () => {
  let driverService: DriverService;
  let driverRepository: Repository<Driver>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DriverService,
        {
          provide: getRepositoryToken(Driver),
          useValue: {
            save: jest.fn().mockResolvedValue(driverListMock[0]),
            find: jest.fn().mockResolvedValue(driverListMock),
            findOneOrFail: jest.fn().mockResolvedValue(driverListMock[0]),
            softDelete: jest.fn().mockResolvedValue(undefined),
            merge: jest.fn().mockResolvedValue(updatedDriverMock),
          },
        },
      ],
    }).compile();

    driverService = module.get<DriverService>(DriverService);
    driverRepository = module.get<Repository<Driver>>(
      getRepositoryToken(Driver),
    );
  });

  it('should be defined', () => {
    expect(driverService).toBeDefined();
    expect(driverRepository).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of drivers', async () => {
      const result = await driverService.findAll();
      expect(driverRepository.find).toHaveBeenCalledTimes(1);
      expect(result).toEqual(driverListResultMock);
    });
  });

  describe('findByTeamId', () => {
    it('should return an array of drivers', async () => {
      const result = await driverService.findByTeamId(1);
      expect(driverRepository.find).toHaveBeenCalledTimes(1);
      expect(result).toEqual(driverListResultMock);
    });
  });

  describe('findOneDetailed', () => {
    it('should return a driver', async () => {
      const result = await driverService.findOneDetailed(1);
      expect(driverRepository.findOneOrFail).toHaveBeenCalledTimes(1);
      expect(result).toEqual(driverListMock[0]);
    });

    it('should throw an error', async () => {
      jest
        .spyOn(driverRepository, 'findOneOrFail')
        .mockRejectedValueOnce(new Error('Driver not found'));
      await expect(driverService.findOneDetailed(2)).rejects.toThrowError(
        'Driver not found',
      );
    });
  });

  describe('findOneOrFail', () => {
    it('should return a driver', async () => {
      const result = await driverService.findOneOrFail(1);
      expect(driverRepository.findOneOrFail).toHaveBeenCalledTimes(1);
      expect(result).toEqual(driverListMock[0]);
    });

    it('should throw an error', async () => {
      jest
        .spyOn(driverRepository, 'findOneOrFail')
        .mockRejectedValueOnce(new Error('Driver not found'));
      await expect(driverService.findOneOrFail(2)).rejects.toThrowError(
        'Driver not found',
      );
    });
  });

  describe('update', () => {
    it('should update a driver', async () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      jest.spyOn(driverRepository, 'save').mockResolvedValue(updatedDriverMock);

      const result = await driverService.update(1, updateDriverMock);
      expect(driverRepository.merge).toHaveBeenCalledTimes(1);
      expect(driverRepository.save).toHaveBeenCalledTimes(1);
      expect(result).toEqual(updatedDriverMock);
    });

    it('should throw an error', async () => {
      jest
        .spyOn(driverRepository, 'save')
        .mockRejectedValueOnce(new Error('Driver not found'));
      await expect(
        driverService.update(2, updateDriverMock),
      ).rejects.toThrowError('Driver not found');
    });
  });

  describe('remove', () => {
    it('should remove a driver', async () => {
      const result = await driverService.remove(1);
      expect(driverRepository.softDelete).toHaveBeenCalledTimes(1);
      expect(result).toEqual(undefined);
    });
  });
});
