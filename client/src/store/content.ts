import Vue from 'vue'
import { Module, Commit } from 'vuex'
import defaultsDeep from 'lodash/defaultsDeep'

export interface SectionDict {
  [key: string]: string
}

export interface LinkSpec {
  text: string
  href: string
  external?: boolean
  if?: () => boolean
}

export interface MenuButtonSpec {
  text?: string
  icon?: string
}

export interface MenuItemSpec {
  title: string
  icon?: string
  action?: (event: MouseEvent) => void
}

export interface MenuSpec {
  button?: MenuButtonSpec
  items: MenuItemSpec[]
}

export interface AlertSpec {
  type: 'success' | 'info' | 'warning' | 'error'
  message: string
}

export interface ContentModuleState {
  title: string | null
  sections: SectionDict | null
  links: LinkSpec[] | null
  menu: MenuSpec | null
  alert: AlertSpec | null
}

const appName = process.env.VUE_APP_NAME || null
const initialState: ContentModuleState = {
  title: appName,
  sections: null,
  links: null,
  menu: null,
  alert: null,
}

const contentModule: Module<ContentModuleState, any> = {
  namespaced: true,
  state: Object.assign({}, initialState),
  getters: {
    appBarHasContent: state =>
      Boolean(state.sections || state.links || state.menu),
  },

  mutations: {
    set(state, content: Partial<ContentModuleState>) {
      Object.assign(state, defaultsDeep(content, initialState))
    },

    clear(state) {
      Object.assign(state, initialState)
    },

    setTitle(state, title: string | null) {
      state.title = title || appName
    },

    setSections(state, sections: SectionDict | null) {
      state.sections = sections
    },

    setLinks(state, links: LinkSpec[] | null) {
      state.links = links
    },

    setMenu(state, menu: MenuSpec | null) {
      state.menu = menu
    },

    showAlert(state, alert: AlertSpec) {
      state.alert = alert
    },

    hideAlert(state) {
      state.alert = null
    },
  },
}

export function showAlert(commit: Commit, alert: AlertSpec) {
  commit('content/showAlert', alert, { root: true })
}

export function hideAlert(commit: Commit) {
  commit('content/hideAlert', null, { root: true })
}

export function userMenu(context: Vue, text: string): MenuSpec {
  const items: MenuItemSpec[] = [
    {
      title: 'Salir',
      icon: 'mdi-logout',
      action: () => {
        context.$store.dispatch('session/logout')
        context.$router.push('/')
      },
    },
  ]

  const user = context.$store.state.session
  if (user && user.revisor) {
    items.unshift({
      title: 'Lista de contribuciones',
      icon: 'mdi-format-list-bulleted',
      action: () => {
        context.$router.push('/posters')
      },
    })
  }

  return {
    button: {
      text: text,
      icon: 'mdi-account',
    },
    items,
  }
}

export default contentModule
