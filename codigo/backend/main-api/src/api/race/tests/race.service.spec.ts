import { RaceService } from '../race.service';
import { Race } from '../models/race.entity';
import { searchParamsMock } from './race.mock';
import { Repository } from 'typeorm';
import { UserService } from '../../user/user.service';
import {
  adminListMock,
  analystsListMock,
  mechanicsListMock,
  userDriverListMock,
} from '../../user/tests/user.mock';
import { createCircuitMock } from '../../circuit/tests/circuit.mock';
import { CircuitService } from '../../circuit/circuit.service';
import { DriverService } from '../../driver/driver.service';
import { TeamService } from '../../team/team.service';
import { ProxyService } from '../../../notifications/proxy/proxy.service';
import { createTestModule } from '../../../shared/testing/test.module';
import { AuthService } from '../../user/auth/auth.service';
import { User } from '../../user/models/user.entity';
import { Driver } from '../../driver/models/driver.entity';
import { Circuit } from '../../circuit/models/circuit.entity';
import { createTeamMock } from '../../team/tests/team.mock';
import { Team } from '../../team/models/team.entity';
import { NotFoundException } from '@nestjs/common';

describe('RaceService', () => {
  let raceService: RaceService;
  let raceRepository: Repository<Race>;
  let userService: UserService;
  let authService: AuthService;
  let circuitService: CircuitService;
  let driverService: DriverService;
  let teamService: TeamService;
  let proxyService: ProxyService;

  let raceTest: Race;
  let raceTest2: Race;
  let circuit: Circuit;
  let team: Team;
  let admin: User;
  let analyst: User;
  let mechanic: User;
  let driverUser: User;
  let driver: Driver;

  beforeAll(async () => {
    const module = await createTestModule();

    raceService = module.get<RaceService>(RaceService);
    authService = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
    circuitService = module.get<CircuitService>(CircuitService);
    driverService = module.get<DriverService>(DriverService);
    teamService = module.get<TeamService>(TeamService);
    proxyService = module.get<ProxyService>(ProxyService);

    circuit = await circuitService.create(createCircuitMock);
    team = await teamService.create(createTeamMock);
    admin = await authService.register(adminListMock[0]);
    mechanic = await authService.register(mechanicsListMock[0]);
    analyst = await authService.register(analystsListMock[0]);
    driverUser = await authService.register(userDriverListMock[0]);
    const detailedDriverUser = await userService.findOneDetailed(driverUser.id);
    driver = await driverService.findOneDetailed(detailedDriverUser.driver.id);
    raceTest = await raceService.create({
      name: 'First race',
      startDate: new Date('2023-04-03T08:00:00.000Z'),
      endDate: new Date('2023-04-03T08:00:00.000Z'),
      totalLaps: 50,
      circuitId: circuit.id,
      analystId: analyst.id,
      mechanics: [{ id: mechanic.id }],
      drivers: [{ id: driver.id }],
      teams: [{ id: team.id }],
    });
  }, 10000);

  describe('create', () => {
    it('should create a race', async () => {
      raceTest2 = await raceService.create({
        name: 'Second race',
        startDate: new Date('2023-04-03T08:00:00.000Z'),
        endDate: new Date('2023-04-03T08:00:00.000Z'),
        totalLaps: 50,
        circuitId: circuit.id,
        analystId: analyst.id,
        mechanics: [{ id: mechanic.id }],
        drivers: [{ id: driver.id }],
        teams: [{ id: team.id }],
      });
      expect(raceTest2.name).toEqual(raceTest2.name);
    });
  });

  describe('findAll', () => {
    it('should return all races related to Driver', async () => {
      const races = await raceService.findAll(driverUser, searchParamsMock);
      expect(races).toBeInstanceOf(Array<Race>);
    });

    it('should return all races related to Mechanic', async () => {
      const races = await raceService.findAll(mechanic, searchParamsMock);
      expect(races).toBeInstanceOf(Array<Race>);
    });

    it('should return all races related to Analyst', async () => {
      const races = await raceService.findAll(analyst, searchParamsMock);
      expect(races).toBeInstanceOf(Array<Race>);
    });

    it('should return all races to Admin', async () => {
      const races = await raceService.findAll(admin, searchParamsMock);
      expect(races).toBeInstanceOf(Array<Race>);
    });
  });

  describe('findOneOrFail', () => {
    it('should return a race', async () => {
      const result = await raceService.findOneOrFail(raceTest.id);
      expect(result).toBeInstanceOf(Race);
    });

    it('should throw an error', async () => {
      await expect(raceService.findOneOrFail(0)).rejects.toThrow(
        new NotFoundException('Race not found'),
      );
    });
  });

  describe('update', () => {
    it('should update a race', async () => {
      const updated = await raceService.update(raceTest.id, {
        name: 'Updated race',
        startDate: new Date('2023-04-03T08:00:00.000Z'),
        endDate: new Date('2023-04-03T08:00:00.000Z'),
        totalLaps: 50,
        circuitId: circuit.id,
        analystId: analyst.id,
        mechanics: [{ id: mechanic.id }],
        drivers: [{ id: driver.id }],
        teams: [{ id: team.id }],
      });
      expect(updated.name).toEqual(updated.name);
    });
  });

  afterAll(async () => {
    await admin.remove();
    await mechanic.remove();
    await analyst.remove();
    await driverUser.remove();
    await driver.remove();
    await circuit.remove();
    await team.remove();
    await raceTest.remove();
    await raceTest2.remove();
  });
});
