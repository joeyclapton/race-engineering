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
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Lap } from '../../lap/models/lap.entity';
import { User } from '../../user/models/user.entity';
import { Circuit } from '../../circuit/models/circuit.entity';
import { Driver } from '../../driver/models/driver.entity';
import { Exclude } from 'class-transformer';
import { Team } from '../../team/models/team.entity';

@Index('Race_pkey', ['id'], { unique: true })
@Entity('Race', { schema: 'public' })
export class Race extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('text', { name: 'name' })
  name: string;

  @Column('timestamp with time zone', { name: 'startDate' })
  startDate: Date;

  @Column('timestamp with time zone', { name: 'endDate' })
  endDate: Date;

  @Column('integer', { name: 'totalLaps', nullable: true })
  totalLaps: number | null;

  @Exclude()
  @CreateDateColumn({ name: 'createdAt', type: 'timestamp', default: 'now()' })
  createdAt: Date | null;

  @Exclude()
  @UpdateDateColumn({ name: 'updatedAt', type: 'timestamp', default: 'now()' })
  updatedAt: Date | null;

  @Exclude()
  @DeleteDateColumn({ name: 'deletedAt', type: 'timestamp', default: null })
  deletedAt: Date | null;

  @OneToMany(() => Lap, (lap) => lap.race)
  laps: Lap[];

  @OneToMany(() => User, (user) => user.analystMainRace)
  mainRaceToAnalysts: User[];

  @ManyToOne(() => User, (user) => user.analystRaces)
  @JoinColumn([{ name: 'analystId', referencedColumnName: 'id' }])
  analyst: User;

  @ManyToOne(() => Circuit, (circuit) => circuit.races)
  @JoinColumn([{ name: 'circuitId', referencedColumnName: 'id' }])
  circuit: Circuit;

  @ManyToOne(() => Driver, (driver) => driver.firstPlaceRaces)
  @JoinColumn([{ name: 'firstPlaceId', referencedColumnName: 'id' }])
  firstPlace: Driver;

  @ManyToMany(() => User, (user) => user.mechanicRaces)
  mechanics: User[];

  @ManyToMany(() => Driver, (driver) => driver.races)
  drivers: Driver[];

  @ManyToMany(() => Team, (team) => team.races)
  @JoinTable({
    name: 'Race_Team',
    joinColumns: [{ name: 'raceId', referencedColumnName: 'id' }],
    inverseJoinColumns: [{ name: 'teamId', referencedColumnName: 'id' }],
    schema: 'public',
  })
  teams: Team[];

  constructor(partial?: Partial<Race>) {
    super();
    Object.assign(this, partial);
  }
}
