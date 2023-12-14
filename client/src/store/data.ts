import { Module } from "vuex";

interface Dictionary<T> {
  [key: string]: T;
}

export interface AppLocales {
  tipo: Dictionary<string>;
  presentacion: Dictionary<string>;
}

export interface EstadoSpec {
  text: string;
  color: string;
  icon?: string;
  action?: string;
}

export interface DataModuleState {
  locales: AppLocales;
  estados: { [state: string]: EstadoSpec };
}

const dataModule: Module<DataModuleState, any> = {
  namespaced: true,
  state: {
    locales: {
      tipo: {
        PI: "Proyecto de investigación",
        TG: "Trabajo de grado",
        SI: "Semillero de investigación",
        O: "Otro",
        "?": "?",
      },
      presentacion: {
        PNC: "Artículo",
        PST: "Póster",
        "?": "?",
      },
    },

    estados: {
      P: {
        text: "Revisión pendiente",
        color: "blue-grey",
        icon: "mdi-comment-question",
      },
      PI: {
        text: "Pre-inscrito",
        color: "info",
        icon: "mdi-page-previous",
      },
      A: {
        text: "Aceptado",
        color: "success",
        icon: "mdi-check",
        action: "Aceptar",
      },
      N: {
        text: "No aceptado",
        color: "red",
        icon: "mdi-close",
        action: "Rechazar",
      },
      PP: {
        text: "Propuesta por revisar",
        color: "blue-grey",
        icon: "mdi-comment-question",
      },
      PA: {
        text: "Propuesta aceptada",
        color: "success",
        icon: "mdi-check",
        action: "Aceptar",
      },
      PR: {
        text: "Propuesta rechazada",
        color: "red",
        icon: "mdi-close",
        action: "Rechazar",
      },
      RPPST: {
        text: "Póster por evaluar",
        color: "info",
        icon: "mdi-page-previous",
      },
      RPPNC: {
        text: "Ponencia por evaluar",
        color: "info",
        icon: "mdi-page-previous",
      },
      RD: {
        text: "Propuesta evaluada",
        color: "success",
        icon: "mdi-check",
      },
      A_PST: {
        text: "Aceptado como Póster",
        color: "success",
        icon: "mdi-check",
      },
      A_PNC: {
        text: "Aceptado como Ponencia",
        color: "success",
        icon: "mdi-check",
      },
      PRE_PST: {
        text: "Pre-inscrito como Póster",
        color: "info",
        icon: "mdi-check",
      },
      PRE_PNC: {
        text: "Pre-inscrito como Ponencia",
        color: "info",
        icon: "mdi-check",
      },
      "?": {
        text: "Desconocido",
        color: "secondary",
        icon: "mdi-comment-question",
      },
    },
  },

  getters: {
    getLocale: (state) => (type: keyof AppLocales, key: string) => {
      const locale = state.locales[type];
      return locale[key] || locale["?"];
    },
  },
};

export default dataModule;
