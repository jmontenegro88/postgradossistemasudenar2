<template>
  <Worker v-model="working">
    <div style="width: 100%; height: 100%;">
      <embed
        v-if="!working"
        type="application/pdf"
        :src="src"
        width="100%"
        height="100%"
      />
    </div>
  </Worker>
</template>

<script lang="ts">
import Vue from 'vue'
import noop from 'lodash/noop'
import Worker from '@/components/Worker.vue'

export default Vue.extend({
  components: {
    Worker,
  },

  props: ['value'],
  data() {
    return {
      src: null as string | null,
    }
  },

  computed: {
    working(): boolean {
      return !this.src
    },
  },

  watch: {
    value() {
      this.onValueChange()
    },
  },

  methods: {
    onValueChange() {
      const v: string | Promise<string> | null = this.value
      if (!v) {
        this.src = null
        return
      }

      if (v instanceof Promise) {
        this.src = null
        v.then(src => (this.src = src), noop)
      } else {
        this.src = v
      }
    },
  },

  created() {
    this.onValueChange()
  },
})
</script>
