import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Car } from '../../car/models/car.entity';
import { Driver } from '../../driver/models/driver.entity';
import { Exclude } from 'class-transformer';
import { Race } from '../../race/models/race.entity';

@Index('Team_pkey', ['id'], { unique: true })
@Entity('Team', { schema: 'public' })
export class Team extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('text', { name: 'name', nullable: true })
  name: string | null;

  @Column('text', { name: 'category', nullable: true })
  category: string | null;

  @Exclude()
  @CreateDateColumn({ name: 'createdAt', type: 'timestamp', default: 'now()' })
  createdAt: Date | null;

  @Exclude()
  @UpdateDateColumn({ name: 'updatedAt', type: 'timestamp', default: 'now()' })
  updatedAt: Date | null;

  @Exclude()
  @DeleteDateColumn({ name: 'deletedAt', type: 'timestamp', default: null })
  deletedAt: Date | null;

  @OneToMany(() => Car, (car) => car.team)
  cars: Car[];

  @OneToMany(() => Driver, (driver) => driver.team)
  drivers: Driver[];

  @ManyToMany(() => Race, (race) => race.teams)
  races: Race[];

  constructor(partial?: Partial<Team>) {
    super();
    Object.assign(this, partial);
  }
}
