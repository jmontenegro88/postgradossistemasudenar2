<template>
  <div :class="{ 'd-flex': !drawer }">
    <template v-if="dsections">
      <v-list v-if="drawer" dense>
        <v-list-group no-action prepend-icon="mdi-arrow-right" :value="true">
          <template v-slot:activator>
            <v-list-item-title>Ir a</v-list-item-title>
          </template>
          <v-list-item
            v-for="(text, name) in dsections"
            :key="name"
            link
            @click="scrollToSection(name)"
          >
            <v-list-item-title v-text="text"></v-list-item-title>
            <v-list-item-action>
              <v-icon>mdi-square-small</v-icon>
            </v-list-item-action>
          </v-list-item>
        </v-list-group>
      </v-list>
      <template v-else>
        <v-btn
          v-for="(text, name) in dsections"
          :key="name"
          v-text="text"
          text
          height="100%"
          v-bind="buttonProps"
          @click="scrollToSection(name)"
          style="padding-inline: 0.5rem; font-size: 0.8rem;"
        ></v-btn>
      </template>
    </template>
    <template v-if="flinks.length > 0">
      <v-list v-if="drawer" dense>
        <v-list-group no-action prepend-icon="mdi-link-variant" :value="true">
          <template v-slot:activator>
            <v-list-item-title>Enlaces</v-list-item-title>
          </template>
          <v-list-item
            v-for="(link, index) in flinks"
            :key="index"
            link
            :href="link.external ? link.href : null"
            :to="!link.external ? link.href : null"
            @click="$emit('dismiss')"
          >
            <v-list-item-title v-text="link.text"></v-list-item-title>
            <v-list-item-action>
              <v-icon>mdi-square-small</v-icon>
            </v-list-item-action>
          </v-list-item>
        </v-list-group>
      </v-list>
      <template v-else>
        <v-divider class="mx-2" inset vertical></v-divider>
        <v-btn
          v-for="(link, index) in flinks"
          :key="index"
          v-text="link.text"
          text
          :href="link.external ? link.href : null"
          :to="!link.external ? link.href : null"
          height="100%"
          style="padding-inline: 0.5rem; font-size: 0.8rem;"
        ></v-btn>
      </template>
    </template>
    <template v-if="dmenu">
      <v-list v-if="drawer" dense>
        <v-list-group
          no-action
          :prepend-icon="menuButton ? menuButton.icon : 'mdi-dots-vertical'"
        >
          <template v-slot:activator>
            <v-list-item-title>
              {{ menuButton ? menuButton.text : "dmenu" }}
            </v-list-item-title>
          </template>
          <v-list-item
            v-for="(item, index) in dmenu.items"
            :key="index"
            link
            @click="menuAction(item, $event)"
          >
            <v-list-item-title v-text="item.title"></v-list-item-title>
            <v-list-item-action v-if="item.icon">
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-action>
          </v-list-item>
        </v-list-group>
      </v-list>
      <v-menu v-else offset-y>
        <template v-slot:activator="{ on }">
          <v-btn v-if="menuButton" text height="100%" v-on="on">
            <v-icon
              v-if="menuButton.icon"
              v-text="menuButton.icon"
              class="mr-1"
            ></v-icon>
            {{ menuButton.text }}
          </v-btn>
          <v-btn v-else icon v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, index) in dmenu.items"
            :key="index"
            @click="menuAction(item, $event)"
          >
            <v-list-item-title>
              <v-icon v-if="item.icon" v-text="item.icon"></v-icon>
              {{ item.title }}
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </template>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { mapState } from "vuex";
import {
  SectionDict,
  LinkSpec,
  MenuSpec,
  MenuItemSpec,
} from "../store/content";
import events from "../events";

interface AppBarContentComponentData {
  dsections: SectionDict | null;
  dlinks: LinkSpec[] | null;
  dmenu: MenuSpec | null;
  holdRefresh: boolean;
}

export default Vue.extend({
  props: {
    drawer: Boolean,
    visible: Boolean,
    buttonProps: {
      type: Object,
      required: false,
    },
  },

  data: (): AppBarContentComponentData => ({
    dsections: null,
    dlinks: null,
    dmenu: null,
    holdRefresh: false,
  }),

  computed: {
    ...mapState("content", ["sections", "links", "menu"]),
    menuButton() {
      return this.dmenu?.button;
    },

    needsRefresh(): boolean {
      return (
        this.dsections !== this.sections ||
        this.dlinks !== this.links ||
        this.dmenu !== this.menu
      );
    },

    flinks() {
      if (!Array.isArray(this.dlinks)) {
        return [];
      }

      return this.dlinks.filter((l) => l && (!l.if || l.if()));
    },
  },

  methods: {
    updateContent() {
      this.dsections = this.sections;
      this.dlinks = this.links;
      this.dmenu = this.menu;
    },

    scrollToSection(name: string) {
      events.$emit("section", name);
      this.$emit("dismiss");
    },

    menuAction(item: MenuItemSpec, event: MouseEvent) {
      if (item.action) {
        item.action(event);
      }
      if (this.drawer) {
        this.$emit("dismiss");
        this.holdRefresh = true;
      }
    },
  },

  watch: {
    visible(v: boolean) {
      if (!v && this.holdRefresh && this.needsRefresh) {
        this.updateContent();
        this.holdRefresh = false;
      }
    },

    needsRefresh(v: boolean) {
      if (v && !this.holdRefresh) {
        this.updateContent();
      }
    },
  },

  mounted() {
    this.updateContent();
  },
});
</script>
