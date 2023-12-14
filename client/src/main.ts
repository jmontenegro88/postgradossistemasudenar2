import './styles/global.scss'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import VueYouTubeEmbed from 'vue-youtube-embed'

Vue.use(VueYouTubeEmbed)

Vue.config.productionTip = false
Vue.config.errorHandler = err => {
  if (process.env.NODE_ENV !== 'production') {
    throw err
  }
}

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app')
