import { TeamController } from '../team.controller';
import { TeamService } from '../team.service';
import { Test, TestingModule } from '@nestjs/testing';
import { teamListMock, createTeamMock, updateTeamMock } from './team.mock';

describe('TeamController', () => {
  let teamController: TeamController;
  let teamService: TeamService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TeamController],
      providers: [
        {
          provide: TeamService,
          useValue: {
            create: jest.fn().mockResolvedValue(teamListMock[0]),
            findAll: jest.fn().mockResolvedValue(teamListMock),
            findOneOrFail: jest.fn().mockResolvedValue(teamListMock[0]),
            findOneDetailed: jest.fn().mockResolvedValue(teamListMock[0]),
            update: jest.fn().mockResolvedValue(updateTeamMock),
            remove: jest.fn().mockResolvedValue(undefined),
            addDriver: jest.fn(),
          },
        },
      ],
    }).compile();

    teamController = module.get<TeamController>(TeamController);
    teamService = module.get<TeamService>(TeamService);
  });

  it('should be defined', () => {
    expect(teamController).toBeDefined();
    expect(teamService).toBeDefined();
  });

  describe('create', function () {
    it('should send create info to service', async function () {
      teamController.create(createTeamMock);
      expect(teamService.create).toBeCalledWith(createTeamMock);
    });
  });

  describe('findAll', function () {
    it('should request all cars from service', async function () {
      teamController.findAll();
      expect(teamService.findAll).toBeCalled();
    });
  });

  describe('findOne', function () {
    it('should request one car from service', async function () {
      teamController.findOne('1');
      expect(teamService.findOneDetailed).toBeCalledWith(1);
    });
  });

  describe('addDriver', function () {
    it('should request add driver to team from service', async function () {
      teamController.addDriver('1', '1');
      expect(teamService.addDriver).toBeCalledWith(1, 1);
    });
  });

  describe('update', function () {
    it('should request update car from service', async function () {
      teamController.update('1', updateTeamMock);
      expect(teamService.update).toBeCalledWith(1, updateTeamMock);
    });
  });

  describe('remove', function () {
    it('should request remove car from service', async function () {
      teamController.remove('1');
      expect(teamService.remove).toBeCalledWith(1);
    });
  });
});
