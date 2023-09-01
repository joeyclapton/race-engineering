import { LapService } from '../lap.service';
import { createTestModule } from '../../../shared/testing/test.module';
import { TeamService } from '../../team/team.service';
import { DriverService } from '../../driver/driver.service';
import { Race } from '../../race/models/race.entity';
import { RaceService } from '../../race/race.service';
import { UserService } from '../../user/user.service';
import { User } from '../../user/models/user.entity';
import { Lap } from '../../lap/models/lap.entity';
import { sendTimerMock, updateLapMock } from './lap.mock';

describe('LapService', () => {
  let lapService: LapService;
  let raceService: RaceService;
  let driverService: DriverService;
  let teamService: TeamService;
  let userService: UserService;
  let race: Race;
  let driverUser: User;
  let lapTest: Lap;

  beforeAll(async () => {
    const module = await createTestModule();

    lapService = module.get<LapService>(LapService);
    raceService = module.get<RaceService>(RaceService);
    driverService = module.get<DriverService>(DriverService);
    teamService = module.get<TeamService>(TeamService);
    userService = module.get<UserService>(UserService);

    driverUser = await userService.findOneDetailed(92);
    race = await raceService.findOneOrFail(37);
    lapTest = await lapService.create(race.id, {
      lapNumber: 1,
      driverId: driverUser.driver.id,
      lapTime: '00:01:20.345',
      remainingGas: 42,
      tyreType: 'WET',
      isAdditional: false,
    });
  }, 70000);

  it('should be defined', () => {
    expect(lapService).toBeDefined();
    expect(driverService).toBeDefined();
    expect(teamService).toBeDefined();
  });

  describe('create', () => {
    it('should create a lap', async () => {
      const res = await lapService.create(race.id, {
        lapNumber: 1,
        driverId: driverUser.driver.id,
        lapTime: '00:01:20.345',
        remainingGas: 42,
        tyreType: 'WET',
        isAdditional: false,
      });
      expect(res).toBeDefined();
    });
  });

  describe('findByRaceId', () => {
    it('should return laps related to a race', async () => {
      const res = await lapService.findByRaceId(race.id);
      expect(res).toBeDefined();
    });
  });

  describe('findByDriverId', () => {
    it('should return laps related to a driver', async () => {
      const res = await lapService.findByDriverId(driverUser.driver.id);
      expect(res).toBeDefined();
    });
  });

  describe('findOne', () => {
    it('should return a lap', async () => {
      const res = await lapService.findOne(lapTest.id);
      expect(res).toBeDefined();
    });

    it('should throw an error', async () => {
      await expect(lapService.findOne(0)).rejects.toThrow();
    });
  });

  describe('findOneDetailed', () => {
    it('should return a lap', async () => {
      const res = await lapService.findOneDetailed(lapTest.id);
      expect(res).toBeDefined();
    });

    it('should throw an error', async () => {
      await expect(lapService.findOneDetailed(0)).rejects.toThrow();
    });
  });

  describe('update', () => {
    it('should update a lap', async () => {
      const res = await lapService.update(lapTest.id, updateLapMock);
      expect(res).toBeDefined();
    });
  });

  describe('sendTimer', () => {
    it('should send a timer', async () => {
      const res = await lapService.sendTimer(lapTest.id, sendTimerMock);
      expect(res).toBeDefined();
    });
  });

  describe('remove', () => {
    it('should remove a lap', async () => {
      const res = await lapService.remove(lapTest.id);
      expect(res).toBeDefined();
    });
  });

  afterAll(async () => {
    await Lap.clear();
  });
});
