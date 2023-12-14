import Vue from 'vue'
import { Module, ActionContext } from 'vuex'
import noop from 'lodash/noop'
import { StoreState } from './index'
import { ClientConfig, configService } from '../services/config'

export type Work<T = any> = Promise<T> | (() => Promise<T>)
export interface WorkSpec<T = any> {
  id: string
  work: Work<T>
}

export interface SharedModuleState {
  works: { [key: string]: Promise<any> }
  clientConfig: ClientConfig | null
}

export function doWork<T, U>(
  { rootState, commit }: ActionContext<U, StoreState>,
  id: string,
  work: Work<T>
): Promise<T> {
  const { works } = rootState.shared
  if (id in works) {
    return works[id]
  }

  commit('shared/startWork', { id, work }, { root: true })
  return works[id]
}

const sharedModule: Module<SharedModuleState, StoreState> = {
  namespaced: true,
  state: {
    works: {},
    clientConfig: null,
  },

  getters: {
    working: state => Object.keys(state.works).length > 0,
    filterWorks: ({ works }) => <T = RegExp | string>(
      patterns: T | T[]
    ): string | string[] | null => {
      if (typeof patterns === 'string') {
        return patterns in works ? patterns : null
      }

      const keys = Object.keys(works)
      if (patterns instanceof RegExp) {
        return keys.find(w => patterns.test(w)) || null
      }

      return Object.keys(works).filter(w => {
        return (patterns as T[]).some(p => {
          if (typeof p === 'string') {
            return w === p
          } else if (p instanceof RegExp) {
            return p.test(w)
          }
        })
      })
    },

    doing: state => (name: string, subname: string) => {
      if (subname) {
        name += `[${subname}]`
      }

      return name in state.works
    },

    featureEnabled: state => (key: keyof ClientConfig) =>
      state.clientConfig?.[key],
  },

  mutations: {
    startWork({ works }, { id, work }: WorkSpec) {
      if (id in works) {
        throw new Error(`Work ${id} already being performed`)
      }

      let p = work
      if (typeof p === 'function') {
        p = p()
      }

      if (!(p instanceof Promise)) {
        p = Promise.resolve(p)
      }

      Vue.set(works, id, p)
      p.finally(() => Vue.delete(works, id)).catch(noop)
    },

    setClientConfig(state, config: ClientConfig) {
      state.clientConfig = config
    },
  },

  actions: {
    fetchClientConfig: context =>
      doWork(context, 'clientConfig', async () => {
        const { commit } = context
        const config = await configService.getClientConfig()
        commit('setClientConfig', config)
      }),
  },
}

export default sharedModule
