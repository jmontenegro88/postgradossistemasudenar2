import { Module } from 'vuex'
import sesionService from '../services/sesion'
import { LoginResult } from '../services/sesion'
import { showAlert, hideAlert } from './content'
import { doWork } from './shared'

export type SessionUser = any | null
export interface SessionData {
  usuario: SessionUser
  admin: boolean
  revisor: boolean
  viewedHomeDialog: boolean
}

// eslint-disable-next-line
export interface SessionModuleState extends SessionData {}

const sessionModule: Module<SessionModuleState, any> = {
  namespaced: true,
  state: {
    usuario: null,
    admin: false,
    revisor: false,
    viewedHomeDialog: false,
  },

  mutations: {
    setSessionData(state, data: SessionData) {
      state.usuario = data.usuario
      state.admin = !!data.admin
      state.revisor = !!data.revisor
    },

    setViewedHomeDialog(state, v: boolean) {
      state.viewedHomeDialog = v
    }
  },

  actions: {
    login: (
      context,
      { email, password }: { email: string; password: string }
    ) =>
      doWork(
        context,
        'login',
        async (): Promise<LoginResult | null> => {
          const { commit } = context
          let result: LoginResult

          try {
            result = await sesionService.login(email, password)
            if (!result.error && !result.token) {
              throw new Error('No se obtuvo ningún token')
            }
          } catch (err) {
            showAlert(commit, {
              type: 'error',
              message: 'No fue posible iniciar sesión',
            })
            return null
          }

          if (!result.error) {
            hideAlert(commit)
            sesionService.token = result.token || null
          } else {
            showAlert(commit, {
              type: 'error',
              message: result.error,
            })
          }

          return result
        }
      ),
    docente: (
      context,
      data: any
    ) =>
      doWork(
        context,
        'docente',
        async (): Promise<LoginResult | null> => {
          const { commit } = context
          let result: LoginResult

          try {
            result = await sesionService.docente(data)
            if (!result.error && !result.token) {
              throw new Error('No se obtuvo ningún token')
            }
          } catch (err) {
            showAlert(commit, {
              type: 'error',
              message: 'No fue posible crear al docente',
            })
            return null
          }

          if (!result.error) {
            hideAlert(commit)
            sesionService.token = result.token || null
          } else {
            showAlert(commit, {
              type: 'error',
              message: result.error,
            })
          }

          return result
        }
      ),

    authenticate: (context, token?: string | null) =>
      doWork(context, 'authenticate', async () => {
        const session = typeof token === 'undefined'
        if (session) {
          token = sesionService.token
        }

        if (!token) {
          throw new Error('No fue posible autenticar al usuario')
        }

        const data = await sesionService.autenticar(token)
        if (session) {
          context.commit('setSessionData', data)
        }

        return data
      }),

    logout({ commit }) {
      commit('poster/clearPosterData', null, { root: true })
      sesionService.token = null
    },
  },
}

export default sessionModule
