enum RoomVisibility {
  PUBLIC = "public",
  PRIVATE = "private"
};
  
class RoomDto {
  id: number;
  name: string;
  owner_id: number;
  password?: string;
  visibility: RoomVisibility;
  pw_protected: boolean;
  members: number[];
  blocked_members?: number[];
  muted_members?: number[];
}

export { RoomDto, RoomVisibility };