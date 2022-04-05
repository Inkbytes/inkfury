import { InjectionKey } from 'vue'
import { Store } from 'vuex'

export interface GlobalConfig {
  isLoading: boolean;
}

export interface GlobalMsg {
  msgState: boolean;
  msg: string;
  error: boolean;
}

export const key: InjectionKey<Store<GlobalConfig>> = Symbol()

// Create a new store instance.
export default {
  namespaced: true,
  state() {
    return {
      isLoading: true,
      msgState: false,
      msg: '',
      error: false
    }
  },
  mutations: {
    setLoading(state: GlobalConfig, payload: boolean) {
      state.isLoading = payload;
    },
    setMsg(state: GlobalMsg, payload: string) {
      state.msg = payload;
    },
    setError(state: GlobalMsg, payload: boolean){
      state.error = payload
      state.msgState = true;
    },
    setState(state: GlobalMsg, payload: boolean){
      state.msgState = payload;
    }
  },
  actions: {}
}
