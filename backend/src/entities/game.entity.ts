import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity({name : 'game'})
class GameEntity {
    @PrimaryGeneratedColumn('uuid')
    gameId: number;

    @Column({type: 'text', default: true})
    p1nick: string;

    @Column()
    p2nick: string;

    @Column()
    p1Score: number;

    @Column()
    p2Score: number;
}
@Entity({name: 'currentgame'})
class CurrentGameEntity {
    @PrimaryGeneratedColumn('uuid')
    gameId: number;
 
    @Column()
    p1nick: string;

    @Column()
    p2nick: string;
}
export {GameEntity, CurrentGameEntity};