import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  login: string;

  @Column()
  username: string;

  @Column()
  passwordHash: string;

  @Column({
    array: true,
    default: [],
  })
  roles: string;

  @CreateDateColumn()
  createdAt: Date;
}
