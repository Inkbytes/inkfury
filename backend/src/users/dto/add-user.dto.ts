export class UserDto {
  id: number;
  fullname: string;
  login: string;
  avatar: string;
  friendList: number[];
  roomList: number[];
  status: boolean;
  statsId?: number;
  matchHistoryId?: number;
  is2fa: boolean;
  token: string;
  blockeUsers: number[];
}
