import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'text', default: ''})
  email: string;

  @Column({ type: 'text' })
  fullname: string;

  @Column({ type: 'text' })
  login: string;

  @Column({ type: 'text', default: '' })
  avatar: string;

  @Column('int', { array: true, default: [] })
  friendList: number[];

  @Column('int', { array: true, default: [] })
  roomList: number[];

  // Change this to enum type maybe
  @Column({ default: false })
  status: boolean;

  @Column()
  statsId: number;

  @Column({ default: 0 })
  matchHistoryId: number;

  @Column({ default: false })
  is2fa: boolean;

  @Column({ type: 'varchar', default: '' })
  token: string;

  @Column({ type: 'boolean', default: false})
  isFirst: boolean;

  @Column('int', { array: true, default: [] })
  blockedUsers: number[];

  // in_game: boolean 
  @Column({ default: false})
  inGame: boolean;

// logged: boolean
  @Column({ default: false})
  isLogged: boolean;

  @Column({select: false, nullable: true})
  authConfirmToken: string
}
