<template>
  <div class="section-card-wrapper">
    <v-card class="section-card" raised>
      <v-list-item three-line>
        <v-list-item-content>
          <v-list-item-title
            class="font-weight-thin text-center mb-4 card-title"
            :class="titleTextSize"
          >
            <div class="card-title-text">
              <slot name="title"></slot>
            </div>
          </v-list-item-title>
          <v-card-text
            class="text-justify grey--text text--darken-3"
            :class="contentTextSize"
          >
            <slot name="content"></slot>
          </v-card-text>
        </v-list-item-content>
      </v-list-item>
    </v-card>
  </div>
</template>
<script lang="ts">
import { Breakpoint } from 'vuetify/types/services/breakpoint'
import BreakpointWatcher from '../mixins/breakpoint-watcher'

export default BreakpointWatcher.extend({
  data: () => ({
    watchBreakpoints: 'xs',
    titleTextSize: '',
    contentTextSize: '',
  }),

  methods: {
    onBreakpointChange(b: Breakpoint) {
      if (b.xs) {
        this.titleTextSize = 'display-1'
        this.contentTextSize = 'body-2'
      } else {
        this.titleTextSize = 'display-2'
        this.contentTextSize = 'body-1'
      }
    },
  },
})
</script>
<style lang="scss" scoped>
@import '~vuetify/src/styles/settings/colors';

.section-card-wrapper {
  padding: 75px 25px;
  &:nth-of-type(odd) {
    background-color: map-get($grey, lighten-4);
  }
}

.section-card {
  width: 1000px;
  max-width: 100%;
  margin: auto;
  padding-top: 35px;
}
</style>
