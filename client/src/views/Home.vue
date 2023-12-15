<template>
  <div class="home-view">
    <v-card class="small-card" elevation="6" v-if="rol" >
      <b>Rol Seleccionado:</b> {{ rol.descripcion }}
    </v-card>
    <Docente v-if="rol && rol.codigo=='PCTE'" />
    <v-dialog v-model="showModal" width="750px" persistent>
      <v-card class="small-card" elevation="6">
        <h3>Selecciona uno de los roles que tienes disponible:</h3>
        <PairRow>
          <template v-slot:first>
            <div class="roles">
              <v-btn
                type="button"
                outlined v-for="(rol, key) in roles"
                :key="key"
                v-on:click="selectRol(rol)"
                >
                {{rol.descripcion}}
              </v-btn>
            </div>
          </template>
        </PairRow>
      </v-card>
    </v-dialog>
  </div>
</template>
<script lang="ts">
import SectionCard from "@/components/SectionCard.vue";
import SectionsContainer from "../mixins/sections-container";
import API from "../services/api";
import { mapState } from "vuex";
import PairRow from "@/components/PairRow.vue";
import Docente from "./Docente.vue";

export interface Network {
  icon: string;
  url: string;
  label: string;
  color: string;
}

export default SectionsContainer.extend({
  components: {
    SectionCard,
    PairRow,
    Docente
  },

  data: () => ({
    roles: JSON.parse(window.localStorage.getItem('ROLES')),
    rol: undefined
  }),

  methods: {
    selectRol(rol) {
      this.showModal = rol
    },
  },

  computed: {
    ...mapState("session", ["viewedHomeDialog"]),
    showModal: {
      get() {
        return !this.rol;
      },

      set(rol: any) {
        this.rol = rol
      },
    },
  },
});
</script>
<style lang="scss">
.home-view {
  margin-bottom: 50px;
}

.center {
  text-align: center;
  align-content: center;
  justify-content: center;
}

.register-row {
  .v-btn {
    max-width: 100%;
  }
}
</style>
