import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  BaseEntity,
} from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: String, unique: true })
  email: string;

  @Column({ type: String, nullable: true })
  @Exclude({ toPlainOnly: true })
  password: string;

  @Column({ type: String })
  about: string;

  @Column({ type: String })
  address: string;

  @Column({ type: String })
  city: string;

  @Column({ type: String })
  state: string;

  @Column({ type: String })
  zipcode: string;

  @Column({ type: String })
  birthday: string;

  @UpdateDateColumn()
  updatedAt: Date;

  @CreateDateColumn()
  createdAt: Date;
}
