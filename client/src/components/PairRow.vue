<template>
  <div v-if="availableSlots.length > 0">
    <v-row justify="center">
      <template v-if="availableSlots.length === 2">
        <v-col cols="12" sm="6" md="3">
          <slot name="first"></slot>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <slot name="second"></slot>
        </v-col>
      </template>
      <slot
        v-else-if="availableSlots.length === 1"
        :name="availableSlots[0]"
      ></slot>
    </v-row>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  computed: {
    availableSlots() {
      return ['first', 'second'].filter(s => this.$slots[s])
    },
  },
})
</script>
