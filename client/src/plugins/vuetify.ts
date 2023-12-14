import "@mdi/font/css/materialdesignicons.css";
import Vue from "vue";
import {
  VExpansionPanels,
  VExpansionPanel,
  VExpansionPanelHeader,
  VExpansionPanelContent,
  VBtn,
  VIcon,
} from "vuetify/lib";
import Vuetify from "vuetify/lib";
import esLocale from "vuetify/src/locale/es";

Vue.use(Vuetify, {
  components: {
    VExpansionPanels,
    VExpansionPanel,
    VExpansionPanelHeader,
    VExpansionPanelContent,
    VBtn,
    VIcon,
  },
});

export default new Vuetify({
  icons: {
    iconfont: "mdiSvg",
  },
  lang: {
    locales: { es: esLocale },
    current: "es",
  },
  theme: {
    themes: {
      light: {
        primary: "#1f4b99",
      },
      dark: {
        primary: "#1f4b99",
      },
    },
  },
});
