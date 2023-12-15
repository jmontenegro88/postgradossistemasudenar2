<template>
  <Worker filter="docente" auth>
    <v-card class="small-card" elevation="6">
      <v-card-title class="display-1 font-weight-thin justify-center mb-6">
        <div class="card-title-text">Creación de docentes</div>
      </v-card-title>
      <v-card-text>
        <Alert></Alert>
        <v-form
          v-model="formValidity.docente"
          name="docente"
          class="local-form"
          @submit="onSubmit"
        >
          <v-text-field
            v-model="nombres"
            label="Nombres"
            outlined
            :rules="[rules.noEmpty]"
            validate-on-blur
            ref="nombres"
          ></v-text-field>
          <v-text-field
            v-model="apellidos"
            label="Apellidos"
            outlined
            :rules="[rules.noEmpty]"
            validate-on-blur
            ref="apellidos"
          ></v-text-field>
          <v-text-field
            v-model="dni"
            label="Identificación"
            outlined
            :rules="[rules.noEmpty]"
            validate-on-blur
            ref="dni"
          ></v-text-field>
          <v-text-field
            v-model="telefono"
            label="Teléfono"
            outlined
            :rules="[rules.noEmpty]"
            validate-on-blur
            ref="telefono"
          ></v-text-field>
          <v-text-field
            v-model="direccion"
            label="Dirección"
            outlined
            :rules="[rules.noEmpty]"
            validate-on-blur
            ref="direccion"
          ></v-text-field>
          <v-text-field
            v-model="email"
            label="Correo electrónico"
            outlined
            :rules="[rules.email]"
            validate-on-blur
            ref="email"
          ></v-text-field>
          <v-select
            :items="['M', 'F', 'O']"
            label="Genero"
            max-width="200"
            class="pa-0 ma-0"
            v-model="genero"
          ></v-select>
          <v-text-field
            v-model="fecha_nacimiento"
            label="Fecha Nacimiento"
            outlined
            :rules="[rules.noEmpty]"
            validate-on-blur
            ref="fecha_nacimiento"
          ></v-text-field>
          <v-select
            :items="['PRE', 'POS']"
            label="Formación Academica"
            max-width="200"
            class="pa-0 ma-0"
            v-model="formacion"
          ></v-select>
          <v-select
            :items="['IS', 'TL', 'DB']"
            label="Areas de conocimiento"
            max-width="200"
            class="pa-0 ma-0"
            v-model="areas"
          ></v-select>
          <PairRow>
            <template v-slot:first>
              <v-btn type="submit" outlined :disabled="!formValidity.docente">
                Guardar
              </v-btn>
            </template>
          </PairRow>
        </v-form>
      </v-card-text>
      <select-eva :mostrar="selectEva" @update="updateEva"></select-eva>
    </v-card>
  </Worker>
</template>
<script lang="ts">

import FormContainer from "../mixins/form-container";
import Worker from "@/components/Worker.vue";
import Alert from "@/components/Alert.vue";
import PairRow from "@/components/PairRow.vue";
import { DocenteResult } from "../services/sesion";

export default FormContainer.extend({
  components: {
    Worker,
    Alert,
    PairRow,
  },
  data: () => ({
    nombres: '',
    apellidos: '',
    dni: '',
    telefono: '',
    direccion: '',
    email: '',
    genero: '',
    fecha_nacimiento: '',
    formacion: '',
    areas: '',
    selectEva: false,
    showPassword: false,
    rules: {
      noEmpty: (t: any) => !!t || "Campo requerido",
      email: (v: any) =>
        /^\S+?@(?:[^\s.]+\.)+[^\s.]{2,}$/.test(v) ||
        "dirección de correo no valida",
    },
  }),

  methods: {
    async submit() {
      const result: DocenteResult = await this.$store.dispatch("session/docente", {
        nombres: this.nombres,
        apellidos: this.apellidos,
        dni: this.dni,
        telefono: this.telefono,
        direccion: this.direccion,
        email: this.email,
        genero: this.genero,
        fecha_nacimiento: this.fecha_nacimiento,
        formacion: this.formacion,
        areas: this.areas,
      });
      if (!result) {
        return;
      }
    },
    updateEva(eva: any) {
      this.selectEva = eva;
    },
  },
});
</script>
