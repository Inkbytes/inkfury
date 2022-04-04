import { InjectionKey } from 'vue'
import { createStore, useStore as useBaseStore, Store } from 'vuex'

import AuthModule, { User42Profile } from './auth'
import GlobalModule, { GlobalConfig, GlobalMsg } from './global'
import ChatModule, { ChatConfig } from './chat'

export interface StoreInterface {
  auth: User42Profile;
  config: GlobalConfig;
  msg: GlobalMsg;
  chat: ChatConfig;
}

export const key: InjectionKey<Store<StoreInterface>> = Symbol()

// Create a new store instance.
export const store = createStore({
  modules: {
    auth: AuthModule,
    config: GlobalModule,
    msg: GlobalModule,
    chat: ChatModule
  }
})

export default function useStore() {
  return useBaseStore(key);
}

