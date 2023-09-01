import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Race } from '../../race/models/race.entity';
import { Exclude } from 'class-transformer';
import { Driver } from '../../driver/models/driver.entity';
import { IPostgresInterval } from 'postgres-interval';

@Index('Lap_pkey', ['id'], { unique: true })
@Entity('Lap', { schema: 'public' })
export class Lap extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('interval', { name: 'lapTime', nullable: true })
  lapTime: IPostgresInterval | null;

  @Column('numeric', { name: 'lapNumber', nullable: true })
  lapNumber: number | null;

  @Column('numeric', { name: 'remainingGas', nullable: true })
  remainingGas: number | null;

  @Column('text', { name: 'tyreType', nullable: true })
  tyreType: string;

  @Column('boolean', { name: 'isAdditional', nullable: true })
  isAdditional = false;

  @ManyToOne(() => Race, (race) => race.laps)
  @JoinColumn([{ name: 'raceId', referencedColumnName: 'id' }])
  race: Race;

  @ManyToOne(() => Driver, (driver) => driver.laps)
  @JoinColumn([{ name: 'driverId', referencedColumnName: 'id' }])
  driver: Driver;

  @Exclude()
  @CreateDateColumn({ name: 'createdAt', type: 'timestamp', default: 'now()' })
  createdAt: Date | null;

  @Exclude()
  @UpdateDateColumn({ name: 'updatedAt', type: 'timestamp', default: 'now()' })
  updatedAt: Date | null;

  @Exclude()
  @DeleteDateColumn({ name: 'deletedAt', type: 'timestamp', default: null })
  deletedAt: Date | null;

  constructor(partial?: Partial<Lap>) {
    super();
    Object.assign(this, partial);
  }
}

export enum TyreType {
  WET = 'WET',
  DRY = 'DRY',
}
