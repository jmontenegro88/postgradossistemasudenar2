import Vue from 'vue'
import events from '@/events'

const SectionsContainer = Vue.extend({
  methods: {
    onSection(name: string) {
      const section = this.$refs[`section-${name}`] as Vue
      if (!(section instanceof Vue)) {
        return
      }
      const element = section.$el as HTMLElement
      window.scrollTo({ top: element.offsetTop, behavior: 'smooth' })
    },
  },

  mounted() {
    events.$on('section', this.onSection)
  },

  destroyed() {
    events.$off('section', this.onSection)
  },
})

export default SectionsContainer
