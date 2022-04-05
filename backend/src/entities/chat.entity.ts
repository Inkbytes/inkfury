import { RoomVisibility } from '../chat/dto/chat.dto';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'room' })
class RoomEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  owner_id: number;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  visibility: RoomVisibility;

  @Column({ nullable: true, default: false })
  pw_protected: boolean;

  @Column('int', { array: true, default: [] })
  admins: number[];

  @Column('int', { array: true, default: [] })
  members: number[];

  @Column('int', { array: true, default: [] })
  blocked_members: number[];

  @Column('int', { array: true, default: [] })
  muted_members: number[];
}

// @Entity({ name: 'relation_table '})
// class RelationEntity {

//   /* room_id as foreign key */
//   // room_id: number

//   /* user_id as foreign key */
//   // user_id: number;

//   @Column({ nullable: true })
//   blocked: boolean;

//   @Column({ nullable: true })
//   muted: boolean;

//   @Column({ nullable: true })
//   is_admin: boolean;
// }

// @Entity({name: 'block_list'})
// class BlockListEntity {
//     @PrimaryColumn('uuid')
//     userId: number;

//     @PrimaryColumn('uuid')
//     BlockedUserId: number;
// }
export { RoomEntity };
