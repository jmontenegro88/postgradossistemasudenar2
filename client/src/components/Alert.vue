<template>
  <v-alert
    v-if="alert"
    v-model="visible"
    class="local-alert"
    dismissible
    :type="alert.type"
    v-bind="props"
  >
    {{ alert.message }}
  </v-alert>
</template>
<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'

export default Vue.extend({
  props: ['props'],
  data: () => ({
    visible: false,
  }),
  computed: mapState('content', ['alert']),
  watch: {
    alert(v) {
      this.visible = !!v
    },

    visible(v) {
      if (!v && this.alert) {
        this.$store.commit('content/hideAlert')
      }
    },
  },
  created() {
    this.visible = !!this.alert
  },
})
</script>
