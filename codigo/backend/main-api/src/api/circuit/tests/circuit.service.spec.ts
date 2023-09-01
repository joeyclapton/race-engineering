import { Test, TestingModule } from '@nestjs/testing';
import { CircuitService } from '../circuit.service';
import { Circuit } from '../models/circuit.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  circuitListMock,
  updateCircuitMock,
  updatedCircuitMock,
} from './circuit.mock';
import { CreateCircuitDto } from '../models/circuit.dto';

describe('CircuitService', () => {
  let circuitService: CircuitService;
  let circuitRepository: Repository<Circuit>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CircuitService,
        {
          provide: getRepositoryToken(Circuit),
          useValue: {
            create: jest.fn().mockResolvedValue(circuitListMock[0]),
            save: jest.fn().mockResolvedValue(circuitListMock[0]),
            find: jest.fn().mockResolvedValue(circuitListMock),
            findOneOrFail: jest.fn().mockResolvedValue(circuitListMock[0]),
            softDelete: jest.fn().mockResolvedValue(undefined),
            merge: jest.fn().mockResolvedValue(updatedCircuitMock),
          },
        },
      ],
    }).compile();

    circuitService = module.get<CircuitService>(CircuitService);
    circuitRepository = module.get<Repository<Circuit>>(
      getRepositoryToken(Circuit),
    );
  });

  it('should be defined', () => {
    expect(circuitService).toBeDefined();
    expect(circuitRepository).toBeDefined();
  });

  describe('create', () => {
    it('should create a circuit', async () => {
      const data: CreateCircuitDto = {
        name: 'Circuit of the Americas',
        local: 'Austin, Texas',
        trackSize: 5.513,
        safetyMargin: 0.5,
      };
      const result = await circuitService.create(data);
      expect(circuitRepository.save).toHaveBeenCalledTimes(1);
      expect(circuitRepository.create).toHaveBeenCalledTimes(1);
      expect(result).toEqual(circuitListMock[0]);
    });
  });

  describe('findAll', () => {
    it('should return an array of circuits', async () => {
      const result = await circuitService.findAll();
      expect(circuitRepository.find).toHaveBeenCalledTimes(1);
      expect(result).toEqual(circuitListMock);
    });
  });

  describe('findOneOrFail', () => {
    it('should return a circuit', async () => {
      const result = await circuitService.findOneOrFail(1);
      expect(circuitRepository.findOneOrFail).toHaveBeenCalledTimes(1);
      expect(result).toEqual(circuitListMock[0]);
    });

    it('should throw an error', async () => {
      jest
        .spyOn(circuitRepository, 'findOneOrFail')
        .mockRejectedValueOnce(new Error('Circuit not found'));
      await expect(circuitService.findOneOrFail(2)).rejects.toThrowError(
        'Circuit not found',
      );
    });
  });

  describe('update', () => {
    it('should update a circuit', async () => {
      jest
        .spyOn(circuitRepository, 'save')
        .mockResolvedValue(updatedCircuitMock);

      const result = await circuitService.update(1, updateCircuitMock);
      expect(circuitRepository.merge).toHaveBeenCalledTimes(1);
      expect(circuitRepository.save).toHaveBeenCalledTimes(1);
      expect(result).toEqual(updatedCircuitMock);
    });

    it('should throw an error', async () => {
      jest
        .spyOn(circuitRepository, 'save')
        .mockRejectedValueOnce(new Error('Circuit not found'));
      await expect(
        circuitService.update(2, updateCircuitMock),
      ).rejects.toThrowError('Circuit not found');
    });
  });

  describe('remove', () => {
    it('should remove a circuit', async () => {
      const result = await circuitService.remove(1);
      expect(circuitRepository.softDelete).toHaveBeenCalledTimes(1);
      expect(result).toEqual(undefined);
    });
  });
});
