import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Team } from '../../team/models/team.entity';
import { Exclude } from 'class-transformer';
import { Driver } from '../../driver/models/driver.entity';

@Index('Car_pkey', ['id'], { unique: true })
@Entity('Car', { schema: 'public' })
export class Car extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('numeric', { name: 'totalFuel', nullable: true })
  totalFuel: number | null;

  @Column('numeric', { name: 'currentFuel', nullable: true })
  currentFuel: number | null;

  @Exclude()
  @CreateDateColumn({ name: 'createdAt', type: 'timestamp', default: 'now()' })
  createdAt: Date | null;

  @Exclude()
  @UpdateDateColumn({ name: 'updatedAt', type: 'timestamp', default: 'now()' })
  updatedAt: Date | null;

  @Exclude()
  @DeleteDateColumn({ name: 'deletedAt', type: 'timestamp', default: null })
  deletedAt: Date | null;

  @ManyToOne(() => Team, (team) => team.cars)
  @JoinColumn([{ name: 'teamId', referencedColumnName: 'id' }])
  team: Team;

  @OneToOne(() => Driver, (driver) => driver.car)
  @JoinColumn([{ name: 'driverId', referencedColumnName: 'id' }])
  driver: Driver;

  constructor(partial?: Partial<Car>) {
    super();
    Object.assign(this, partial);
  }
}
