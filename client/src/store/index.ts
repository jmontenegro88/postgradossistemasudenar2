import Vue from 'vue'
import Vuex from 'vuex'
import registro from './registro'
import contentModule, { ContentModuleState } from './content'
import sessionModule, { SessionModuleState } from './session'
import dataModule, { DataModuleState } from './data'
import sharedModule, { SharedModuleState } from './shared'

Vue.use(Vuex)

export interface StoreState {
  content: ContentModuleState
  session: SessionModuleState
  data: DataModuleState
  shared: SharedModuleState
}

export const store = new Vuex.Store<StoreState>({
  modules: {
    registro,
    content: contentModule,
    session: sessionModule,
    data: dataModule,
    shared: sharedModule,
  },
})

export type LocalStore = typeof store
export default store
