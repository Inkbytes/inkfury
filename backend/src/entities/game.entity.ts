import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'game' })
class GameEntity {
  @PrimaryColumn()
  gameId: number;

  @Column({ type: 'text', default: true })
  p1nick: string;

  @Column()
  p2nick: string;

  @Column()
  p1Score: number;

  @Column()
  p2Score: number;
}

@Entity({ name: 'currentgame' })
class CurrentGameEntity {
  @PrimaryColumn()
  gameId: number;

  @Column({ default: '' })
  p1nick: string;

  @Column({ default: '' })
  p2nick: string;
}

export { GameEntity, CurrentGameEntity };
