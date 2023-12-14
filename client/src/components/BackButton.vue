<template>
  <v-btn
    icon
    class="back-button"
    @click="target && $router.push(target)"
    v-on="listeners"
  >
    <v-icon>mdi-arrow-left</v-icon>
  </v-btn>
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: ['target'],
  computed: {
    listeners() {
      return this.$listeners
    },
  },
})
</script>
<style>
.back-button {
  position: absolute;
  left: 0px;
  transform: translateX(50%);
}
</style>
