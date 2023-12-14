<template>
  <Worker filter="login" auth>
    <v-card class="small-card" elevation="6">
      <v-card-title class="display-1 font-weight-thin justify-center mb-6">
        <div class="card-title-text">Iniciar sesión</div>
      </v-card-title>
      <v-card-subtitle class="text-center">
        Puede revisar y actualizar sus contribuciones, y consultar si estas han
        sido aceptadas
      </v-card-subtitle>
      <v-card-text>
        <Alert></Alert>
        <v-form
          v-model="formValidity.login"
          name="login"
          class="local-form"
          @submit="onSubmit"
        >
          <v-text-field
            v-model="email"
            label="Correo electrónico"
            append-icon="mdi-email"
            outlined
            :rules="[rules.email]"
            validate-on-blur
            ref="email"
          ></v-text-field>
          <v-text-field
            v-model="password"
            label="Contraseña"
            :type="showPassword ? 'text' : 'password'"
            outlined
            :rules="[rules.noEmpty]"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword = !showPassword"
            ref="password"
          ></v-text-field>
          <PairRow>
            <template v-slot:first>
              <v-btn type="submit" outlined :disabled="!formValidity.login">
                Ingresar
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
import { LoginResult } from "../services/sesion";

export default FormContainer.extend({
  components: {
    Worker,
    Alert,
    PairRow,
  },
  data: () => ({
    email: "",
    password: "",
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
      const result: LoginResult = await this.$store.dispatch("session/login", {
        email: this.email,
        password: this.password,
      });
      if (!result) {
        return;
      }
      if (result.token) {
        window.localStorage.setItem('TOKEN', result.token)
        window.localStorage.setItem('ROLES', JSON.stringify(result.roles))
        this.$router.push("/");
        return;
      }

      let focusTarget: any = null;
      switch (result.code) {
        case "ERR_UNKNOWN_EMAIL":
          focusTarget = this.$refs.email;
          break;
        case "ERR_WRONG_PASSWORD":
          focusTarget = this.$refs.password;
          break;
      }
      if (focusTarget) {
        focusTarget.focus();
      }
    },
    updateEva(eva: any) {
      this.selectEva = eva;
    },
  },
});
</script>
