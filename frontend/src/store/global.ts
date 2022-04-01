import { InjectionKey } from 'vue'
import { Store } from 'vuex'

export interface GlobalConfig {
  isLoading: boolean;
}

export const key: InjectionKey<Store<GlobalConfig>> = Symbol()

// Create a new store instance.
export default {
  namespaced: true,
  state() {
    return {
      isLoading: true
    }
  },
  mutations: {
    setLoading(state: GlobalConfig, payload: boolean) {
      state.isLoading = payload;
    }
  },
  actions: {}
}
