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
    }
  },
  mutations: {
    toggleUsersList(state: ChatConfig) {
      state.showUsers = !state.showUsers;
    },
    userRooms(state: ChatConfig, data: ChatRoom[]){
      state.rooms = data;
    }
  },
  actions: {}
}
