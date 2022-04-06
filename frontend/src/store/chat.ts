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
  showUsers: boolean;
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
      showUsers: false,
      rooms: [],
      currentRoomId: null,
      socket: null
    }
  },
  mutations: {
    toggleUsersList(state: ChatConfig) {
      state.showUsers = !state.showUsers;
    },
    userRooms(state: ChatConfig, data: ChatRoom[]){
      console.log(data)
      state.currentRoomId = data?.[0]?.id || null;
      state.rooms = data;
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
