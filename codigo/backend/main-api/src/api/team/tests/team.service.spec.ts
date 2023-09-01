import { Test, TestingModule } from '@nestjs/testing';
import { TeamService } from '../team.service';
import { Team } from '../models/team.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  teamListMock,
  updateTeamMock,
  updatedTeamMock,
  createTeamMock,
  teamWithDriverMock,
} from './team.mock';
import { DriverService } from '../../driver/driver.service';
import { Driver } from '../../driver/models/driver.entity';
import { driverListMock } from '../../driver/tests/driver.mock';

describe('TeamService', () => {
  let teamService: TeamService;
  let driverService: DriverService;
  let teamRepository: Repository<Team>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TeamService,
        {
          provide: getRepositoryToken(Team),
          useValue: {
            create: jest.fn().mockResolvedValue(teamListMock[0]),
            save: jest.fn().mockResolvedValue(teamListMock[0]),
            find: jest.fn().mockResolvedValue(teamListMock),
            findOneOrFail: jest.fn().mockResolvedValue(teamListMock[0]),
            softDelete: jest.fn().mockResolvedValue(undefined),
            merge: jest.fn().mockResolvedValue(updatedTeamMock),
          },
        },
        DriverService,
        {
          provide: DriverService,
          useValue: {
            findOneDetailed: jest.fn().mockResolvedValue(driverListMock[0]),
          },
        },
      ],
    }).compile();

    teamService = module.get<TeamService>(TeamService);
    driverService = module.get<DriverService>(DriverService);
    teamRepository = module.get<Repository<Team>>(getRepositoryToken(Team));
  });

  it('should be defined', () => {
    expect(teamService).toBeDefined();
    expect(teamRepository).toBeDefined();
  });

  describe('create', () => {
    it('should create a team', async () => {
      const result = await teamService.create(createTeamMock);
      expect(teamRepository.save).toHaveBeenCalledTimes(1);
      expect(teamRepository.create).toHaveBeenCalledTimes(1);
      expect(result).toEqual(teamListMock[0]);
    });
  });

  describe('findAll', () => {
    it('should return an array of teams', async () => {
      const result = await teamService.findAll();
      expect(teamRepository.find).toHaveBeenCalledTimes(1);
      expect(result).toEqual(teamListMock);
    });
  });

  describe('findOneOrFail', () => {
    it('should return a team', async () => {
      const result = await teamService.findOneOrFail(1);
      expect(teamRepository.findOneOrFail).toHaveBeenCalledTimes(1);
      expect(result).toEqual(teamListMock[0]);
    });

    it('should throw an error', async () => {
      jest
        .spyOn(teamRepository, 'findOneOrFail')
        .mockRejectedValueOnce(new Error('Team not found'));
      await expect(teamService.findOneOrFail(2)).rejects.toThrowError(
        'Team not found',
      );
    });
  });

  describe('addDriver', () => {
    it('should add a driver to a team', async () => {
      const result = await teamService.addDriver(1, 1);
      expect(teamRepository.findOneOrFail).toHaveBeenCalledTimes(1);
      expect(driverService.findOneDetailed).toHaveBeenCalledTimes(1);
      expect(teamRepository.save).toHaveBeenCalledTimes(1);
      expect(result).toEqual(teamWithDriverMock);
    });
  });

  describe('update', () => {
    it('should update a team', async () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      jest.spyOn(teamRepository, 'save').mockResolvedValue(updatedTeamMock);

      const result = await teamService.update(1, updateTeamMock);
      expect(teamRepository.merge).toHaveBeenCalledTimes(1);
      expect(teamRepository.save).toHaveBeenCalledTimes(1);
      expect(result).toEqual(updatedTeamMock);
    });

    it('should throw an error', async () => {
      jest
        .spyOn(teamRepository, 'save')
        .mockRejectedValueOnce(new Error('Team not found'));
      await expect(teamService.update(2, updateTeamMock)).rejects.toThrowError(
        'Team not found',
      );
    });
  });

  describe('remove', () => {
    it('should remove a team', async () => {
      const result = await teamService.remove(1);
      expect(teamRepository.softDelete).toHaveBeenCalledTimes(1);
      expect(result).toEqual(undefined);
    });
  });
});
