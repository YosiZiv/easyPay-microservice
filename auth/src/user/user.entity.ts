import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';
import { IsEmail } from 'class-validator';
import * as argon2 from 'argon2';
import { Exclude } from 'class-transformer';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userName: string;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  @Exclude({ toPlainOnly: true })
  password: string;

  @Column({ type: 'timestamp', nullable: true })
  lastLogged: Date;

  @Column({ default: 'user' })
  role: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  deletedAt: Date;

  @BeforeInsert()
  async hashPassword() {
    this.password = await argon2.hash(this.password);
  }
}
