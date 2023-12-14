<template>
  <v-row>
    <v-col class="pt-0 pb-0">
      <v-text-field
        v-model="pw1"
        ref="pw1"
        label="Contraseña"
        :type="show1 ? 'text' : 'password'"
        :rules="pwdRules"
        outlined
      ></v-text-field>
    </v-col>
    <v-col class="pt-0 pb-0">
      <v-text-field
        v-model="pw2"
        ref="pw2"
        label="Confirmar contraseña"
        :type="show1 ? 'text' : 'password'"
        :rules="pwdConfirm"
        outlined
        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
        @click:append="show1 = !show1"
        @paste="onPaste"
      ></v-text-field>
    </v-col>
  </v-row>
</template>
<script>
export default {
  props: ['value'],
  data() {
    return {
      pw1: null,
      pw2: null,
      pwdRules: [
        v => !!v || 'Contraseña requerida',
        v =>
          (!!v && v.length > 7) ||
          'La contraseña debe tener 8 caracteres minimo',
      ],
      pwdConfirm: [
        v => !!v || 'Confirmar contraseña',
        v => v === this.pw1 || 'Las contraseñas no coinciden',
      ],
      show1: false,
      show2: false,
    }
  },
  watch: {
    pw1() {
      if (this.pw2 && this.pw2.length > 7) {
        this.$emit('input', this.pw)
        this.$refs['pw2'].validate(true)
      }
    },
    pw() {
      this.$emit('input', this.pw)
    },
  },
  computed: {
    pw() {
      return this.pw1 === this.pw2 ? this.pw2 : null
    },
  },

  methods: {
    onPaste(e) {
      e.preventDefault()
    },
  },
}
</script>
