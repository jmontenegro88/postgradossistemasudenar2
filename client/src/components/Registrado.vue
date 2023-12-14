<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="400" persistent>
      <v-card class="alert-body">
        <v-card-title class="white--text text-h5 justify-center alert-header">
          ADVERTENCIA
        </v-card-title>
        <v-divider class="divider"> </v-divider>
        <v-card-text class="text-justify alert-body">
          <div v-if="evaluadorRegistrado">
            <div class="text-body-1">
              Usted ya se encuentra registrado en el sistema. Si desea
              postularse como evaluador haga click en aceptar, de lo contrario
              presione cancelar.
            </div>
            <v-divider class="primary mt-2"></v-divider>
          </div>
          <div v-else>
            <v-alert dense type="warning" class="text-subtitle-1">
              <b> Usted ya se encuentra registrado</b>
            </v-alert>
          </div>
          <v-divider class="body-divider"> </v-divider>
          <v-card-title class="white--text text-h6 justify-center alert-title">
            Datos registrados en el sistema
          </v-card-title>
          <v-list class="alert-content">
            <v-list-item>
              <v-list-item-content>
                <div class="col">
                  <div class="row white--text pb-2">
                    <b>Documento</b>
                  </div>
                  <div class="row row-info">
                    <span> {{ datos.dni }}</span>
                  </div>
                </div>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <div class="col">
                  <div class="row white--text pb-2">
                    <b>Nombres y Apellidos</b>
                  </div>
                  <div class="row row-info">
                    <span> {{ datos.nombres }} {{ datos.apellidos }}</span>
                  </div>
                </div>
              </v-list-item-content>
            </v-list-item>
            <v-list-item class="mb-2">
              <v-list-item-content>
                <div class="col">
                  <div class="row white--text pb-2">
                    <b>Correo Electrónico</b>
                  </div>
                  <div class="row row-info">
                    <span> {{ datos.email }}</span>
                  </div>
                </div>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card-text>
        <v-divider class="divider"></v-divider>
        <v-card-actions class="justify-center">
          <v-btn
            v-if="evaluadorRegistrado"
            color="error"
            outlined
            @click="$emit('cancelar', false)"
          >
            Cancelar
          </v-btn>
          <v-btn
            v-if="evaluadorRegistrado"
            color="grey"
            outlined
            @click="
              $emit('aceptar', {
                dialog: false,
                data: datos,
              })
            "
          >
            Aceptar
          </v-btn>
          <v-btn
            v-else
            color="#71AA2A"
            class="white--text"
            @click="
              {
                $emit('cancelar', false);
                $router.push('/home');
              }
            "
          >
            Aceptar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "registrado",
  props: ["dialog", "datos", "evaluadorRegistrado"],
});
</script>
<style type="scss">
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

.alert-content {
  border-radius: 10px !important;
  background-color: #064487 !important;
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
