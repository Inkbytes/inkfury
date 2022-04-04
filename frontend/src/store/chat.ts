import { InjectionKey } from 'vue'
import { Store } from 'vuex'

export interface ChatRoom {

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
      currentRoomId: null
    }
  },
  mutations: {
    toggleUsersList(state: ChatConfig) {
      state.showUsers = !state.showUsers;
    },
  },
  actions: {}
}
