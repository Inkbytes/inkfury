import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity({name : 'users'})
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column({type: 'text', default: true})
    fullname: string;

    @Column({type: 'text', default: true})
    username: string;

    @Column({type: 'text', default: true})
    avatar: string;

    @Column({type: 'varchar', default: true})
    token: string;
}