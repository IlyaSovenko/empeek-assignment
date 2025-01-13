import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  BaseEntity,
} from 'typeorm';

@Entity()
export class OnboardingOrderEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  addressStep: number;

  @Column()
  birthdayStep: number;

  @Column()
  aboutStep: number;

  @UpdateDateColumn()
  updatedAt: Date;

  @CreateDateColumn()
  createdAt: Date;
}
