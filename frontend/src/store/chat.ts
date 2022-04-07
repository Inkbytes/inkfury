import { Socket } from 'socket.io-client'
import { InjectionKey } from 'vue'
import { Store } from 'vuex'
import { RoomVisibility } from '../../../backend/src/chat/dto/chat.dto'
export interface ChatRoom {
  id: number
  name: string
  owner_id: number
  password?: string
  visibility: RoomVisibility
  pw_protected: boolean
  members: number[]
  admins: number[]
  blocked_members: number[]
  muted_members: number[]
}

export interface ChatConfig {
  showInbox: boolean;
  showUsers: boolean;
  hasRoom: boolean;
  rooms: ChatRoom[];
  currentRoomId: number | null;
  socket: Socket;
}

export const key: InjectionKey<Store<ChatConfig>> = Symbol()

// Create a new store instance.
export default {
  namespaced: true,
  state() {
    return {
      showInbox: true,
      showUsers: false,
      hasRoom: false,
      rooms: [],
      currentRoomId: null,
      socket: null
    }
  },
  mutations: {
    refreshInbox(state: ChatConfig) {
      state.showInbox = false;
      setTimeout(() => {
        state.showInbox = true;
      }, 100);
    },
    toggleUsersList(state: ChatConfig) {
      state.showUsers = !state.showUsers;
    },
    userRooms(state: ChatConfig, data: ChatRoom[]){
      console.log(data)
      state.currentRoomId = data?.[0]?.id || null;
      state.rooms = data;
      state.hasRoom = !!data?.length;
    },
    addRoom(state: ChatConfig, data: ChatRoom) {
      state.rooms = [...state.rooms, data];
      state.hasRoom = !!state.rooms?.length;
      state.currentRoomId = data?.id || null;
      state.socket.emit('joinRoom', data?.name);
    },
    leaveRoom(state: ChatConfig, data: ChatRoom) {
      state.rooms = state.rooms?.filter((e) => e.id !== data?.id) || [];
      state.hasRoom = !!state.rooms?.length;
      state.currentRoomId = state.rooms?.length > 0 ? state.rooms[0].id : null;
      state.socket.emit('leaveRoom', data?.name);
      state.socket.emit('joinRoom', state.rooms[0]?.name);
    },
    setCurrentRoomId(state: ChatConfig, id: number){
      state.currentRoomId = id;
    },
    setSocket(state: ChatConfig, socket: Socket){
      state.socket = socket;
    }
  },
  actions: {}
}
