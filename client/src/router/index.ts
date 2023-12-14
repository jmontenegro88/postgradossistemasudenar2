import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import routerGuard from './guard'
import events from '@/events'

Vue.use(VueRouter)

const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
    meta: {
      content: 'home',
    },
  },
  {
    path: '/login',
    name: 'login',
    component: () =>
      import(/* webpackChunkName: "login" */ '../views/Login.vue'),
  },
  {
    path: '/revision',
    name: 'admin',
    component: () =>
      import(/* webpackChunkName; "admin" */ '../views/Admin.vue'),
    meta: {
      content: 'userMenu',
    },
  },
  {
    path: '*',
    redirect: '/',
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})
router.beforeEach(routerGuard)
router.afterEach((to, from) => events.$emit('route', to, from))

export default router
