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

  @Column()
  p1nick: string;

  @Column()
  p2nick: string;
}
export { GameEntity, CurrentGameEntity };
