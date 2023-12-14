<template>
  <div>
    <v-app-bar color="primary" app dark>
      <template v-if="appBarHasContent">
        <v-app-bar-nav-icon
          v-if="md"
          @click="drawer = true"
        ></v-app-bar-nav-icon>
      </template>
      <v-toolbar-title>
        <a href="#" @click.prevent="home()">{{ title }}</a>
      </v-toolbar-title>
      <template v-if="appBarHasContent && !md">
        <v-spacer></v-spacer>
        <AppBarContent
          style="height: 100%"
          :buttonProps="buttonProps"
        ></AppBarContent>
      </template>
    </v-app-bar>
    <v-navigation-drawer
      v-if="appBarHasContent"
      v-model="drawer"
      app
      temporary
      @transitionend="onDrawerTransitionEnd()"
    >
      <AppBarContent
        drawer
        :visible="drawerVisible"
        @dismiss="onDrawerDismiss"
      ></AppBarContent>
    </v-navigation-drawer>
  </div>
</template>
<script lang="ts">
import { mapState, mapGetters } from "vuex";
import { Breakpoint } from "vuetify/types/services/breakpoint";
import BreakpointWatcher from "../mixins/breakpoint-watcher";
import AppBarContent from "./AppBarContent.vue";
import events from "../events";

export default BreakpointWatcher.extend({
  components: {
    AppBarContent,
  },

  data: () => ({
    watchBreakpoints: "width",
    md: false,
    drawer: false,
    drawerVisible: false,
    buttonProps: null as Partial<Record<"small" | "x-small", boolean>> | null,
  }),

  computed: {
    ...mapState("content", ["title"]),
    ...mapGetters("content", ["appBarHasContent"]),
  },

  methods: {
    onBreakpointChange({ width }: Breakpoint) {
      if (width < 1300) {
        this.buttonProps = { "x-small": true };
      } else if (width < 1500) {
        this.buttonProps = { small: true };
      } else {
        this.buttonProps = null;
      }

      const mdAndDown = width < 1125;
      if (this.drawer && !mdAndDown) {
        this.drawer = false;
      }

      this.md = mdAndDown;
    },

    handleAction(type: string, ...args: any[]) {
      if (this.drawer) {
        this.drawer = false;
      }
      switch (type) {
        case "section":
          events.$emit("section", ...args);
          break;
      }
    },

    onDrawerTransitionEnd() {
      if (!this.drawer) {
        this.drawerVisible = false;
      }
    },

    onDrawerDismiss() {
      this.drawer = false;
    },

    home() {
      const current = this.$route;
      if (current && current.name === "home") {
        return;
      }
      this.$router.push("/");
    },
  },

  watch: {
    drawer(v: boolean) {
      if (v) {
        this.drawerVisible = true;
      }
    },
  },
});
</script>
<style scoped>
a {
  color: inherit !important;
  text-decoration: none !important;
  user-select: none !important;
}
</style>
