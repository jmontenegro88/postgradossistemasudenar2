<template functional>
  <v-expansion-panels v-bind="props" v-on="listeners">
    <v-expansion-panel v-for="item in props.data" :key="item.key">
      <v-expansion-panel-header class="subtitle-2" :class="item.headerClass">
        <slot :name="`${item.key}.header`" v-bind="item">
          <span v-text="item.header"></span>
        </slot>
      </v-expansion-panel-header>
      <v-expansion-panel-content class="mt-4">
        <slot :name="`${item.key}.content`" v-bind="item">
          <span v-text="item.content"></span>
        </slot>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
