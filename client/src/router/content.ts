import Vue from "vue";
import { Route } from "vue-router";
import { ContentModuleState, userMenu } from "../store/content";
import store from "../store";

export type ContentSpec = Partial<ContentModuleState> | null;
export interface ContentDict {
  [key: string]:
    | ContentSpec
    | ((context: Vue, to: Route, from: Route) => ContentSpec);
}

const featureEnabled = store.getters["shared/featureEnabled"];
const routesContent: ContentDict = {
  home: {
    links: [
      {
        text: "Cerrar sesión",
        href: "/login",
      },
    ],
  },

  userMenu: (context: Vue) => {
    const store = context.$store;
    const { usuario } = store.state.session;
    if (!usuario) {
      return null;
    }
    return {
      menu: userMenu(context, `${usuario.nombres} ${usuario.apellidos}`),
    };
  },
};

export function getRouteContent(
  contentKey: string,
  context: Vue,
  to: Route,
  from: Route
) {
  const content = routesContent[contentKey];
  if (!content) {
    return null;
  }
  if (typeof content === "function") {
    return content(context, to, from);
  } else {
    return content;
  }
}

export default getRouteContent;
