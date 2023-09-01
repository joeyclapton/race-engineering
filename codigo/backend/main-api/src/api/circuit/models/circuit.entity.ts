import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Race } from '../../race/models/race.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

@Index('Circuit_pkey', ['id'], { unique: true })
@Entity('Circuit', { schema: 'public' })
export class Circuit extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  @ApiProperty({ type: 'number', example: 1 })
  id: number;

  @Column('text', { name: 'name', nullable: true })
  @ApiProperty({ type: 'string', example: 'Circuit of the Americas' })
  name: string | null;

  @Column('text', { name: 'local', nullable: true })
  @ApiProperty({ type: 'string', example: 'Austin, Texas' })
  local: string | null;

  @Column('numeric', { name: 'trackSize', nullable: true })
  @ApiProperty({ type: 'number', example: 5.513 })
  trackSize: number | null;

  @Column('numeric', { name: 'safetyMargin', nullable: true })
  @ApiProperty({ type: 'number', example: 0.5 })
  safetyMargin: number | null;

  @Exclude()
  @CreateDateColumn({ name: 'createdAt', type: 'timestamp', default: 'now()' })
  createdAt: Date | null;

  @Exclude()
  @UpdateDateColumn({ name: 'updatedAt', type: 'timestamp', default: 'now()' })
  updatedAt: Date | null;

  @Exclude()
  @DeleteDateColumn({ name: 'deletedAt', type: 'timestamp', default: null })
  deletedAt: Date | null;

  @OneToMany(() => Race, (race) => race.circuit)
  races: Race[];

  constructor(circuit?: Partial<Circuit>) {
    super();
    this.id = circuit?.id;
    this.name = circuit?.name;
    this.local = circuit?.local;
    this.trackSize = circuit?.trackSize;
    this.safetyMargin = circuit?.safetyMargin;
    this.createdAt = circuit?.createdAt;
    this.updatedAt = circuit?.updatedAt;
    this.deletedAt = circuit?.deletedAt;
  }
}
