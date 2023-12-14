<template>
  <v-app>
    <v-main>
      <AppBar></AppBar>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>
<script lang="ts">
import Vue from 'vue'
import { Route } from 'vue-router'
import noop from 'lodash/noop'
import AppBar from '@/components/AppBar.vue'
import events from './events'
import { getRouteContent } from './router/content'

export default Vue.extend({
  components: {
    AppBar,
  },

  methods: {
    onRoute(to: Route, from: Route) {
      const store = this.$store
      document.body.scrollIntoView(true)
      if (to.meta) {
        const contentKey: string = to.meta.content
        if (contentKey) {
          const content = getRouteContent(contentKey, this, to, from)
          if (content) {
            store.commit('content/set', content)
            return
          }
        }
      }
      store.commit('content/clear')
    },
  },

  async created() {
    const store = this.$store
    if (!store.state.shared.clientConfig) {
      store.dispatch('shared/fetchClientConfig').catch(noop)
    }
  },

  mounted() {
    events.$on('route', this.onRoute)
  },

  destroyed() {
    events.$off('route', this.onRoute)
  },
})
</script>
<style>
html {
  overflow: auto !important;
}
</style>
