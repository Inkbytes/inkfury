import { Entity, Column, PrimaryColumn, CreateDateColumn } from 'typeorm';

@Entity({ name: 'room' })
class RoomEntity {
  @PrimaryColumn('uuid')
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  ownerId: number;

  @Column({ type: 'text' })
  password: string;

  @Column()
  visibility: string; // Enum of state. Public | Private | Password Protected

  @Column()
  pwdProtected: boolean;
}

// @Entity({name: 'block_list'})
// class BlockListEntity {
//     @PrimaryColumn('uuid')
//     userId: number;

//     @PrimaryColumn('uuid')
//     BlockedUserId: number;
// }
export { RoomEntity };
