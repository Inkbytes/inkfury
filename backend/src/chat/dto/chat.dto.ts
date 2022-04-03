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
}

export { RoomDto, RoomVisibility };