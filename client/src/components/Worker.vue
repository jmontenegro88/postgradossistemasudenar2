<template>
  <div class="worker-wrapper" @keydown="working && $event.preventDefault()">
    <div
      class="d-flex worker-wrapper"
      :class="{ 'worker-masked-content': dworking }"
    >
      <div style="width: 100%; height: 100%;">
        <slot></slot>
      </div>
    </div>
    <div v-if="dworking">
      <div class="worker-content-mask" :style="maskStyle"></div>
      <div class="worker-center">
        <v-progress-circular
          :size="50"
          :width="5"
          indeterminate
          color="primary"
        >
          <v-btn v-if="cancellable" icon @click="$emit('cancel')">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-progress-circular>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { mapState, mapGetters } from 'vuex'

interface MaskStyle {
  left: string
  top: string
  width: string
  height: string
}

export interface WorkerComponentData {
  dworking: boolean
  maskStyle: MaskStyle | null
}

export default Vue.extend({
  props: {
    value: {
      type: Boolean,
      default: undefined,
    },

    filter: {
      type: [String, RegExp, Array],
      default: undefined,
    },

    cancellable: {
      type: Boolean,
      default: false,
    },

    auth: {
      type: Boolean,
      default: false,
    },
  },

  data: (): WorkerComponentData => ({
    dworking: false,
    maskStyle: null,
  }),

  computed: {
    ...mapState('shared', ['works']),
    ...mapGetters('shared', {
      filterWorks: 'filterWorks',
      sworking: 'working',
    }),

    working(): boolean {
      if (typeof this.value !== 'undefined') {
        return this.value
      }

      const { auth } = this
      let { filter } = this
      if (auth) {
        if (filter) {
          if (Array.isArray(filter)) {
            filter = filter.concat('authenticate')
          } else {
            filter = [filter, 'authenticate']
          }
        } else {
          filter = 'authenticate'
        }
      }

      if (!filter) {
        this.$emit('change', Object.keys(this.works))
        return this.sworking
      }

      const works = this.filterWorks(filter)
      this.$emit('change', works)
      return Array.isArray(works) ? works.length > 0 : !!works
    },
  },

  methods: {
    getMaskStyle(this: Vue): MaskStyle | null {
      const defaultSlots = this.$slots.default
      if (!defaultSlots || defaultSlots.length === 0) {
        return null
      }

      const contentElem = defaultSlots[0].elm as HTMLElement
      if (!contentElem) {
        return null
      }

      const rect = contentElem.getBoundingClientRect()
      const wrapperRect = this.$el.getBoundingClientRect()

      return {
        left: `${rect.left - wrapperRect.left}px`,
        top: `${rect.top - wrapperRect.top}px`,
        width: `${rect.width}px`,
        height: `${rect.height}px`,
      }
    },

    updateDisplay() {
      const v = this.working
      if (!v) {
        this.dworking = false
        return
      }

      setTimeout(() => {
        if (this.working && !this.dworking) {
          this.dworking = true
        }
      }, 250)
    },

    updateMask() {
      const maskStyle = this.getMaskStyle()
      if (maskStyle) {
        this.maskStyle = maskStyle
      } else {
        this.maskStyle = null
      }
    },
  },

  watch: {
    working() {
      this.updateDisplay()
    },

    dworking() {
      this.updateMask()
    },
  },

  created() {
    this.updateMask()
    this.updateDisplay()
  },
})
</script>
<style lang="scss">
.worker-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}

.worker-masked-content {
  pointer-events: none;
  user-select: none;
}

.worker-content-mask {
  position: absolute;
  background-color: rgba(255, 255, 255, 0.35);
}

.worker-center {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
}
</style>
