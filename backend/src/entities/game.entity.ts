import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'game' })
class GameEntity {
  @PrimaryColumn()
  gameId: number;

  @Column({ type: 'int', default: 0 })
  p1id: number;

  @Column({ default: 0 })
  p2id: number;

  @Column({ default: 0 })
  p1Score: number;

  @Column({ default: 0 })
  p2Score: number;
}

@Entity({ name: 'currentgame' })
class CurrentGameEntity {
  @PrimaryColumn()
  gameId: number;

  @Column({ default: 0 })
  p1id?: number;

  @Column({ default: 0 })
  p2id?: number;
}

@Entity({ name: 'scoregame '})
class ScoreGameEntity{
	@PrimaryColumn()
	userId: number;

	@Column({ default: 0})
	wins: number;
}

export { GameEntity, CurrentGameEntity, ScoreGameEntity };
