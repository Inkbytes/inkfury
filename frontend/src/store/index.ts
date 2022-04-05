import { InjectionKey } from 'vue'
import { createStore, useStore as useBaseStore, Store } from 'vuex'

import AuthModule, { User42Profile } from './auth'
import GlobalModule, { GlobalConfig, GlobalMsg } from './global'

export interface StoreInterface {
  auth: User42Profile;
  config: GlobalConfig;
  msg: GlobalMsg;
}

export const key: InjectionKey<Store<StoreInterface>> = Symbol()

// Create a new store instance.
export const store = createStore({
  modules: {
    auth: AuthModule,
    config: GlobalModule,
    msg: GlobalModule
  }
})

export default function useStore() {
  return useBaseStore(key);
}

