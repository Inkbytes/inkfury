import { RoomVisibility } from '../chat/dto/chat.dto';
import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';

@Entity({ name: 'room' })
class RoomEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  owner_id: number;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  visibility: RoomVisibility; // Enum of state. Public | Private | Password Protected

  @Column({ nullable: true, default: false })
  pw_protected: boolean;
}

// @Entity({name: 'block_list'})
// class BlockListEntity {
//     @PrimaryColumn('uuid')
//     userId: number;

//     @PrimaryColumn('uuid')
//     BlockedUserId: number;
// }
export { RoomEntity };

