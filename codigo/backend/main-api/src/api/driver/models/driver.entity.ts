import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Team } from '../../team/models/team.entity';
import { User } from '../../user/models/user.entity';
import { Race } from '../../race/models/race.entity';
import { Exclude } from 'class-transformer';
import { Car } from '../../car/models/car.entity';
import { Lap } from '../../lap/models/lap.entity';

@Index('Driver_pkey', ['id'], { unique: true })
@Entity('Driver', { schema: 'public' })
export class Driver extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('numeric', { name: 'number', nullable: true })
  number: number;

  @Column('boolean', { name: 'isActive', nullable: true })
  isActive: boolean | null;

  @Column('text', { name: 'nationality', nullable: true })
  nationality: string | null;

  @Column('numeric', { name: 'bestLapTime', nullable: true })
  bestLapTime: number | null;

  @Column('numeric', { name: 'bestRaceTime', nullable: true })
  bestRaceTime: number | null;

  @Column('numeric', { name: 'totalRaceTime', nullable: true })
  totalRaceTime: number | null;

  @Column('numeric', { name: 'totalRaceKm', nullable: true })
  totalRaceKm: number | null;

  @Exclude()
  @CreateDateColumn({ name: 'createdAt', type: 'timestamp', default: 'now()' })
  createdAt: Date | null;

  @Exclude()
  @UpdateDateColumn({ name: 'updatedAt', type: 'timestamp', default: 'now()' })
  updatedAt: Date | null;

  @Exclude()
  @DeleteDateColumn({ name: 'deletedAt', type: 'timestamp', default: null })
  deletedAt: Date | null;

  @OneToOne(() => User, (user) => user.driver)
  @JoinColumn([{ name: 'userId', referencedColumnName: 'id' }])
  user: User;

  @ManyToOne(() => Team, (team) => team.drivers)
  @JoinColumn([{ name: 'teamId', referencedColumnName: 'id' }])
  team: Team;

  @OneToOne(() => Car, (car) => car.driver)
  car: Car;

  @OneToMany(() => Race, (race) => race.firstPlace)
  firstPlaceRaces: Race[];

  @OneToMany(() => Lap, (lap) => lap.driver)
  laps: Lap[];

  @ManyToMany(() => Race, (race) => race.drivers)
  @JoinTable({
    name: 'Race_Driver',
    joinColumns: [{ name: 'driverId', referencedColumnName: 'id' }],
    inverseJoinColumns: [{ name: 'raceId', referencedColumnName: 'id' }],
    schema: 'public',
  })
  races: Race[];

  constructor(partial?: Partial<Driver>) {
    super();
    Object.assign(this, partial);
  }
}
