import { Entity , Column, PrimaryColumn, CreateDateColumn} from "typeorm";

@Entity({name: 'room'})
class RoomEntity {
    @PrimaryColumn('uuid')
    roomId: number;

    @Column()
    roomName: string;

    @Column()
    adminId: number;

}

// 
@Entity({name: 'messages'})
class MessageEntity {
    @PrimaryColumn('uuid')
    senderId: number;

    @Column()
    roomId: number;

    @Column()
    messageData: string;

    @CreateDateColumn()
    messageDate:  Date;
}

@Entity({name: 'generalChat'})
class ChatEntity {
    @PrimaryColumn('uuid')
    chatId: number;

    @Column()
    admin: number;
}

export {RoomEntity, ChatEntity, MessageEntity};