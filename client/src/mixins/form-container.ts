import Vue from 'vue'
import { mapState, mapMutations } from 'vuex'

export interface FormContainerData {
  formValidity: { [key: string]: boolean }
}

// eslint-disable-next-line
const submitNoop = (_event: Event): void => {}

const FormContainer = Vue.extend({
  data: (): FormContainerData => ({
    formValidity: {},
  }),

  computed: {
    ...mapState('validation', ['rules']),
    ...mapState('shared', ['works']),
  },

  methods: {
    ...mapMutations('shared', ['startWork']),
    submit: submitNoop,
    onSubmit(event: Event) {
      const target = event.target as HTMLFormElement
      const { name } = target
      const workId = `${name}FormSubmit`
      event.preventDefault()

      if (!this.formValidity[name] || workId in this.works) {
        return
      }

      if (
        target.contains(document.activeElement) &&
        document.activeElement instanceof HTMLElement
      ) {
        document.activeElement.blur()
      }

      const result: any = this.submit(event)
      if (!(result instanceof Promise)) {
        return
      }

      this.startWork({ id: workId, work: result })
    },
  },
})

export default FormContainer
