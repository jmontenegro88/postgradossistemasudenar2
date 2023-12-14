<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="400" persistent>
      <v-card elevation="10 alert-body">
        <v-card-title class="text-h5 alert-header justify-center white--text">
          <b>Confirma tu Información</b>
        </v-card-title>
        <v-divider class="divider"></v-divider>
        <v-card-text class="text-start">
          <v-list-item>
            <v-list-item-content>
              <div class="col">
                <div class="row white--text pb-2">
                  <b>Nombres y Apellidos</b>
                </div>
                <div class="row row-info">
                  <span> {{ info.nombres }} {{ info.apellidos }}</span>
                </div>
              </div>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <div class="col">
                <div class="row white--text pb-2">
                  <b>Correo Electrónico</b>
                </div>
                <div class="row row-info">
                  <span> {{ info.email }}</span>
                </div>
              </div>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <div class="row">
                <div class="col-6">
                  <div class="white--text pb-2">
                    <b>Documento</b>
                  </div>
                  <div class="row-info">
                    <span> {{ info.dni }}</span>
                  </div>
                </div>
                <div class="col-6">
                  <div class="white--text pb-2">
                    <b>Teléfono</b>
                  </div>
                  <div class="row-info">
                    <span> {{ info.telefono }}</span>
                  </div>
                </div>
              </div>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <div class="col">
                <div class="row white--text pb-2">
                  <b>Institución</b>
                </div>
                <div class="row row-info">
                  <span> {{ info.institucion }}</span>
                </div>
              </div>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <div class="col">
                <div class="row white--text pb-2">
                  <b>Programa</b>
                </div>
                <div class="row row-info">
                  <span> {{ info.programa }}</span>
                </div>
              </div>
            </v-list-item-content>
          </v-list-item>
        </v-card-text>

        <v-divider class="divider"></v-divider>

        <v-card-actions class="justify-center">
          <v-btn
            color="#C21C28"
            class="white--text"
            @click="$emit('mostrarInfo', false)"
          >
            Cambiar
          </v-btn>
          <v-btn
            color="#71AA2A"
            class="white--text"
            @click="$emit('guardar', false)"
          >
            ACEPTAR
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "conf-info",
  props: ["dialog", "info"],
});
</script>
<style>
.alert-header,
.alert-body {
  background-color: #064487 !important;
}

.divider {
  background-color: #ead61a;
  margin-inline: 1.5rem;
  height: 1rem;
  border: 0.125rem solid #ead61a;
  border-radius: 10px;
  margin-bottom: 1rem;
}

.body-divider {
  background-color: #ead61a;
  height: 1rem;
  border: 0.125rem solid #ead61a;
  border-radius: 10px;
  margin-bottom: 1rem;
}

.alert-title {
  padding: 0;
}

.row-info {
  background-color: white !important;
  border-radius: 5px;
  border: solid 1px white;
  display: flex;
  justify-content: start;
  align-items: center;
  padding-left: 0.5rem;
  font-weight: 300;
  height: auto;
}

.row-info span {
  margin-block: 0.5rem;
}

.col {
  margin: 0;
  padding-block: 0.5rem;
}
</style>
