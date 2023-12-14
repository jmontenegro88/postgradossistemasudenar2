import Vue from 'vue'
import { Breakpoint } from 'vuetify/types/services/breakpoint'
import debounce from 'lodash/debounce'
import difference from 'lodash/difference'

type BreakpointNames = string | string[] | null
type WatchCallback = () => void

export interface BreakpointWatcherComponentData {
  watchBreakpoints: BreakpointNames
  unwatch: { [key: string]: () => void }
  watchHandler: WatchCallback | null
}

// eslint-disable-next-line
const onBreakpointChangeNoop = (b: Breakpoint | null) => {}

const BreakpointWatcher = Vue.extend({
  data: (): BreakpointWatcherComponentData => ({
    watchBreakpoints: [],
    unwatch: {},
    watchHandler: null,
  }),

  methods: {
    updateWatchers(oldValue?: BreakpointNames) {
      if (!this.watchHandler) {
        throw new Error('No watch handler has been registered')
      }
      let breakpoints = this.watchBreakpoints || []
      if (!Array.isArray(breakpoints)) {
        breakpoints = [breakpoints]
      }
      if (oldValue) {
        for (const b of difference(oldValue, breakpoints)) {
          this.unwatch[b]()
        }
      }
      if (breakpoints.length === 0) {
        return
      }
      for (const b of breakpoints) {
        const unwatch = this.$watch(
          `$vuetify.breakpoint.${b}`,
          this.watchHandler
        )
        this.unwatch[b] = () => {
          unwatch()
          delete this.unwatch[b]
        }
      }
    },

    onBreakpointChange: onBreakpointChangeNoop,
  },

  watch: {
    watchBreakpoints(_: BreakpointNames, oldValue: BreakpointNames) {
      this.updateWatchers(oldValue)
    },
  },

  created() {
    this.watchHandler = debounce<WatchCallback>(() => {
      this.onBreakpointChange(this.$vuetify.breakpoint)
    })
    this.updateWatchers()
    this.watchHandler()
  },

  destroyed() {
    for (const b of Object.keys(this.unwatch)) {
      this.unwatch[b]()
    }
  },
})

export default BreakpointWatcher
