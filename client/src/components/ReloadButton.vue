<template functional>
  <v-btn icon class="reload-button" v-on="listeners">
    <v-icon>mdi-reload</v-icon>
  </v-btn>
</template>
<style>
.reload-button {
  position: absolute;
  right: 0px;
  transform: translateX(-50%);
}
</style>
