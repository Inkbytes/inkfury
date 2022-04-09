import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'game' })
class GameEntity {
  @PrimaryColumn()
  gameId: number;

  @Column({ type: 'int'})
  p1id?: number;

  @Column()
  p2id?: number;

  @Column()
  p1Score?: number;

  @Column()
  p2Score?: number;
}


@Entity({ name: 'scoregame'})
class ScoreGameEntity{
  @PrimaryColumn()
  userId: number;

  @Column({default: 0})
  wins?: number;
}

export { GameEntity, ScoreGameEntity };
