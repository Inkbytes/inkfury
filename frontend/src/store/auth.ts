import { InjectionKey } from 'vue'
import { createStore, Store, StoreOptions } from 'vuex'

export interface User42Profile {
  logged: boolean;
  user: {
    id: number;
    email: string;
    login: string;
    fullname: string;
    avatar: string;
  } | null
}

export const key: InjectionKey<Store<User42Profile>> = Symbol()

// Create a new store instance.
export default {
  namespaced: true,
  state() {
    return {
      logged: false,
      user: null
    }
  },
  mutations: {
    setLogged(state: User42Profile, payload: boolean) {
      state.logged = payload;
    },
    setUser(state: User42Profile, payload:any){
      state.user = payload
    }
  },
  actions: {}
}
