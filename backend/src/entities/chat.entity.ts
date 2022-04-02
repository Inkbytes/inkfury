import { Entity, Column, PrimaryColumn, CreateDateColumn } from 'typeorm';

@Entity({ name: 'room' })
class RoomEntity {
  @PrimaryColumn('uuid')
  roomId: number;

  @Column({ type: 'varchar' })
  roomName: string;

  @Column({ type: 'varchar' })
  ownerId: number;

  @Column({ type: 'text' })
  password?: string;

  @Column()
  state: number; // Enum of state. Public | Private | Password Protected
}

// @Entity({name: 'block_list'})
// class BlockListEntity {
//     @PrimaryColumn('uuid')
//     userId: number;

//     @PrimaryColumn('uuid')
//     BlockedUserId: number;
// }
export { RoomEntity };
