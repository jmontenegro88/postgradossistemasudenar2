import assert from 'assert'
import { NavigationGuard, Route } from 'vue-router'
import { isObject } from 'lodash'
import store from '../store'
import { ClientConfig } from '../services/config'

type FeatureGuardSpec =
  | keyof ClientConfig
  | { feature: keyof ClientConfig; fallback: string }
  | ((
      route: Route,
      setFallback: (f: string) => void
    ) => keyof ClientConfig | boolean | null | void)

const routeRequiredFeatures: {
  [key: string]: FeatureGuardSpec
} = {
  admin: {
    feature: 'evaluacion',
    fallback: '/usuario',
  },
}

const featureEnabled = store.getters['shared/featureEnabled']

const routerGuard: NavigationGuard = async (to, _from, next) => {
  const { name } = to
  const sessionState = store.state.session
  let fallback = '/'
  const setFallback = (f: string) => (fallback = f)

  switch (name) {
    case 'usuario':
    case 'admin':
      try {
        await store.dispatch('session/authenticate')
        if (!sessionState.usuario) {
          throw new Error('Usuario no autenticado')
        }
      } catch (err) {
        next('/login')
        return
      }
      break
  }

  switch (name) {
    case 'admin':
      if (!sessionState.admin) {
        next('/usuario')
        return
      }
      break
    case 'posters':
      if (!sessionState.revisor) {
        next('/usuario')
        return
      }
      break
  }

  if (name && name in routeRequiredFeatures) {
    let feature: FeatureGuardSpec = routeRequiredFeatures[name]
    try {
      if (typeof feature === 'function') {
        const result = feature(to, setFallback)
        if (result === true || result === null || result === undefined) {
          next()
          return
        }

        assert(result)
        feature = result
      } else if (isObject(feature)) {
        ;({ feature, fallback } = feature as {
          feature: keyof ClientConfig
          fallback: string
        })
      }

      await store.dispatch('shared/fetchClientConfig')
      assert(featureEnabled(feature), 'Ruta no habilitada')
    } catch (err) {
      next(fallback)
      return
    }
  }

  next()
}

export default routerGuard
