<template>
  <div>
    <v-dialog v-model="inputDialog" persistent max-width="450">
      <v-card>
        <v-card-title class="headline pb-6">
          Escriba a continuación los motivos
        </v-card-title>

        <v-card-text class="pb-0">
          <v-textarea
            outlined
            v-model="observacion"
            label="Observaciones"
          ></v-textarea>
        </v-card-text>

        <v-card-actions>
          <v-btn color="red " text @click="yes()" :disabled="!observacion">
            Guardar
          </v-btn>
          <v-spacer></v-spacer>

          <v-btn color="blue " text @click="no()">Cancelar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: ['value'],
  data() {
    return {
      observacion: null,
      estado: undefined,
    }
  },
  computed: {
    inputDialog() {
      return this.value.inputDialog
    },
    dialog() {
      return {
        inputDialog: this.inputDialog,
        observacion: this.observacion,
        estado: this.estado,
      }
    },
  },
  watch: {
    inputDialog() {
      if (!this.inputDialog) this.observacion = null
    },
  },
  methods: {
    close() {
      this.dialog.inputDialog = false
      this.$emit('input', this.dialog)
    },
    no() {
      this.observacion = null
      this.close()
    },
    yes() {
      this.estado = 'N'
      this.close()
      this.value.next()
    },
  },
}
</script>
