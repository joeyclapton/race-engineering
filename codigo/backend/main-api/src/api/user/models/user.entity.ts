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
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Driver } from '../../driver/models/driver.entity';
import { Race } from '../../race/models/race.entity';

export enum Role {
  Admin = 'ADMIN',
  Driver = 'DRIVER',
  Mechanic = 'MECHANIC',
  Analyst = 'ANALYST',
}

@Index('User_pkey', ['id'], { unique: true })
@Entity('User', { schema: 'public' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column({ type: 'varchar', nullable: true })
  @ApiProperty({ type: 'string', example: 'John Doe' })
  name: string | null;

  @Column({ type: 'varchar' })
  @ApiProperty({ type: 'string', example: 'john@email.com' })
  email!: string;

  @Exclude()
  @Column({ type: 'varchar' })
  password!: string;

  @Column({ type: 'varchar', nullable: false })
  @ApiProperty({ type: 'string', example: 'DRIVER', enum: Role })
  role!: string;

  @Exclude()
  @Column({ type: 'timestamp', nullable: true, default: null })
  @ApiProperty({ type: 'string', example: '2021-01-01T00:00:00.000Z' })
  lastLoginAt: Date | null;

  @Exclude()
  @CreateDateColumn({ name: 'createdAt', type: 'timestamp', default: 'now()' })
  createdAt: Date | null;

  @Exclude()
  @UpdateDateColumn({ name: 'updatedAt', type: 'timestamp', default: 'now()' })
  updatedAt: Date | null;

  @Exclude()
  @DeleteDateColumn({ name: 'deletedAt', type: 'timestamp', default: null })
  deletedAt: Date | null;

  @OneToOne(() => Driver, (driver) => driver.user)
  driver: Driver;

  @OneToMany(() => Race, (race) => race.analyst)
  analystRaces: Race[];

  @ManyToOne(() => Race, (race) => race.mainRaceToAnalysts)
  @JoinColumn([{ name: 'mainRaceId', referencedColumnName: 'id' }])
  analystMainRace: Race;

  @ManyToMany(() => Race, (race) => race.mechanics)
  @JoinTable({
    name: 'Race_Mechanic',
    joinColumns: [{ name: 'mechanicId', referencedColumnName: 'id' }],
    inverseJoinColumns: [{ name: 'raceId', referencedColumnName: 'id' }],
    schema: 'public',
  })
  mechanicRaces: Race[];

  constructor(partial?: Partial<User>) {
    super();
    Object.assign(this, partial);
  }
}
