import {Column, Entity,PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";

@Entity({name : 'users'})
export class UserEntity {
    @PrimaryColumn()
    id: number;

    @Column({type: 'text',unique: true, default: ""})
    fullname: string;

    @Column({type: 'text'})
    login: string;

    @Column({type: 'text', default: ""})
    avatar: string;

    @Column("int", {array: true, default: []})
    friendList: number[];

    @Column("int", {array: true, default: []})
    roomList: number[];

    // Change this to enum type maybe 
    @Column({default: false})
    status: boolean;

    @Column({nullable: true})
    statsId: number;

    @Column({nullable: true})
    matchHistoryId: number;

    @Column({default: false})
    is2fa: boolean;

    @Column({type: 'varchar', default: true})
    token: string;

    @Column({type: 'varchar', default: []})
    blockedUsers: number[];
}
