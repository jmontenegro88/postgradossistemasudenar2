<template>
  <Worker :filter="/^posterUpsert/" auth>
    <v-card ref="form" class="local-card" elevation="6">
      <BackButton @click="back()"></BackButton>
      <v-card-title class="display-1 font-weight-thin justify-center mb-8">
        <div class="card-title-text">
          <template v-if="crear">Registro de Artículo</template>
          <template v-else>Actualizar Artículo</template>
        </div>
      </v-card-title>
      <v-card-subtitle v-if="page === 1" class="text-center">
        Llene el formulario con los datos de su contribución (recuerde que el
        resumen tiene como máximo 300 palabras en total).
      </v-card-subtitle>
      <v-card-subtitle v-if="page === 2" class="text-center">
        <v-alert dense type="info">
          Verifique los datos de los autores (máximo 10) antes de guardar, esta
          información será utilizada para la respectiva certificación
        </v-alert>
      </v-card-subtitle>
      <v-card-subtitle v-if="page === 3" class="text-center">
        <v-alert dense type="info">
          Verifique todos los datos antes de guardar
        </v-alert>
      </v-card-subtitle>
      <!-- <v-card-subtitle v-if="page === 1" class="text-center">
        Seleccione a continuación el evento en el que desea participar.
      </v-card-subtitle> -->
      <!-- <v-card-text> -->
      <v-stepper class="register-form-stepper" v-model="page">
        <v-stepper-items>
          <v-stepper-content class="register-form-step-content" step="1">
            <v-text-field
              v-model="titulo"
              label="Título"
              required
              outlined
              :rules="[rules.noEmpty]"
              class="mt-2"
            ></v-text-field>

            <v-select
              v-model="tipo"
              :items="tipo_poster"
              label="Resultado de"
              item-value="value"
              item-name="value"
              required
              outlined
              :rules="[rules.noEmpty]"
            ></v-select>

            <v-text-field
              v-if="detalle_tipo_label"
              v-model="detalle_tipo"
              :label="detalle_tipo_label"
              required
              outlined
              :rules="tipo == 'O' ? [rules.noEmpty] : []"
              class="mt-2"
            ></v-text-field>

            <!-- <v-textarea
              v-model="resumen"
              label="Resumen"
              hint="Máximo 100 palabras"
              auto-grow
              rows="2"
              required
              outlined
              :rules="[rules.noEmpty, rules.maxWords(100)]"
            ></v-textarea> -->

            <v-textarea
              v-model="introduccion"
              label="Introducción"
              auto-grow
              rows="2"
              required
              outlined
              :rules="[rules.noEmpty]"
            ></v-textarea>

            <!-- <v-textarea
              v-model="problema_inv"
              label="Problema de investigación"
              hint="Máximo 250 palabras"
              auto-grow
              rows="2"
              required
              outlined
              :rules="[rules.noEmpty, rules.maxWords(250)]"
            ></v-textarea> -->

            <!-- <v-textarea
              v-model="ref_teorico"
              label="Referente teórico"
              hint="Máximo 250 palabras"
              auto-grow
              rows="2"
              required
              outlined
              :rules="[rules.noEmpty, rules.maxWords(250)]"
            ></v-textarea> -->

            <v-textarea
              v-model="objetivo_general"
              label="Objetivo General"
              auto-grow
              rows="2"
              required
              outlined
              :rules="[rules.noEmpty]"
            ></v-textarea>

            <!-- <v-textarea
              v-model="objetivo_especifico"
              label="Objetivos Específicos"
              hint="Máximo 150 palabras"
              auto-grow
              rows="2"
              required
              outlined
              :rules="[rules.noEmpty, rules.maxWords(150)]"
            ></v-textarea> -->

            <v-textarea
              v-model="metodologia"
              label="Metodología"
              auto-grow
              rows="2"
              required
              outlined
              :rules="[rules.noEmpty]"
            ></v-textarea>

            <v-textarea
              v-model="resultados"
              label="Resultados"
              auto-grow
              rows="2"
              required
              outlined
              :rules="[rules.noEmpty]"
            ></v-textarea>

            <v-textarea
              v-model="conclusiones"
              label="Conclusiones"
              auto-grow
              rows="2"
              required
              outlined
              :rules="[rules.noEmpty]"
            ></v-textarea>

            <!-- <v-textarea
              v-model="referencias"
              label="Referencias"
              hint="Máximo 250 palabras"
              auto-grow
              rows="2"
              required
              outlined
              :rules="[rules.noEmpty, rules.maxWords(250)]"
            ></v-textarea> -->

            <Keywords v-model="palabras_claves"></Keywords>
            <v-row class="mt-2">
              <v-progress-linear
                :value="count / 3"
                :color="count > 300 ? 'red' : 'green'"
                height="40"
              >
                <strong>{{ count }}/300 Palabras</strong>
              </v-progress-linear>
              <!-- <v-col class="text-center">
                <h4 :class="count > 300 ? 'red--text' : 'gray--text'">
                  {{ count }}/300 Palabras
                </h4>
              </v-col> -->
            </v-row>
            <v-row>
              <v-col class="text-left">
                <v-btn :block="xs" outlined @click="$router.push('/usuario')">
                  Regresar
                </v-btn>
              </v-col>

              <v-col class="text-right">
                <v-btn
                  :block="xs"
                  color="primary"
                  outlined
                  @click="page = 2"
                  :disabled="validateA"
                >
                  Siguiente
                </v-btn>
              </v-col>
            </v-row>
          </v-stepper-content>

          <v-stepper-content class="register-form-step-content" step="2">
            <Autores v-model="autores" :xs="xs"></Autores>
            <v-row>
              <v-col>
                <v-btn :block="xs" outlined @click="page = 1">Atrás</v-btn>
              </v-col>

              <v-col class="text-right">
                <v-btn
                  :block="xs"
                  outlined
                  @click="
                    page = 3;
                    previewPdf();
                  "
                >
                  Siguiente
                </v-btn>
              </v-col>
            </v-row>
          </v-stepper-content>
          <v-stepper-content class="register-form-step-content" step="3">
            <Pdfpreview
              v-model="fileURL"
              :key="fileURL"
              class="preview-pdf"
            ></Pdfpreview>
            <v-row>
              <v-col>
                <v-btn
                  :block="xs"
                  outlined
                  @click="
                    page = 2;
                    fileURL = null;
                  "
                >
                  Atrás
                </v-btn>
              </v-col>

              <v-col class="text-right">
                <v-btn :block="xs" color="primary" outlined @click="save">
                  Guardar
                </v-btn>
              </v-col>
            </v-row>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
      <!-- </v-card-text> -->
    </v-card>
  </Worker>
</template>

<script>
import Vue from "vue";
import { mapState } from "vuex";
import PosterUser from "../mixins/poster-user";
import BreakpointWatcher from "../mixins/breakpoint-watcher";
import Keywords from "../components/Keywords";
import Autores from "../components/Autores";
import Pdfpreview from "../components/Pdfpreview.vue";
import BackButton from "@/components/BackButton.vue";
import Worker from "@/components/Worker.vue";
import posterService from "../services/poster";
import Swal from "sweetalert2";
import { isModifiablePoster } from "../models/poster";

export default Vue.extend({
  mixins: [PosterUser, BreakpointWatcher],
  components: {
    Keywords,
    Autores,
    BackButton,
    Worker,
    Pdfpreview,
  },
  data() {
    return {
      xs: false,
      watchBreakpoints: ["xsOnly"],
      page: 1,
      id_poster: null,
      titulo: null,
      detalle_tipo: null,
      // resumen: null,
      introduccion: null,
      // problema_inv: null,
      // ref_teorico: null,
      objetivo_general: null,
      // objetivo_especifico: null,
      metodologia: null,
      resultados: null,
      palabras_claves: [],
      conclusiones: null,
      // referencias: null,
      evento: null,
      tipo: null,
      id_participante: null,
      autores: [],
      fileURL: null,
    };
  },
  watch: {},
  created() {
    // if (this.$route.params.id !== 'nuevo') this.page = 2 //verificar **se boorro anteriormente
    this.init();
  },
  computed: {
    ...mapState("registro", [
      "evento_poster",
      "tipo_poster",
      "detalle_tipo_labels",
      "rules",
      "atributosPoster",
      "countWords",
    ]),
    ...mapState("session", ["usuario"]),
    form() {
      return {
        // resumen: this.resumen,
        // problema_inv: this.problema_inv,
        // ref_teorico: this.ref_teorico,
        conclusiones: this.conclusiones,
        // referencias: this.referencias,
        titulo: this.titulo,
        introduccion: this.introduccion,
        detalle_tipo: this.detalle_tipo ? this.detalle_tipo : null,
        objetivo_general: this.objetivo_general,
        // objetivo_especifico: this.objetivo_especifico,
        metodologia: this.metodologia,
        resultados: this.resultados,
        palabras_claves: this.palabras,
        tipo: this.tipo,
        evento: this.evento,
        autores: this.autores,
        id_participante: this.id_participante,
      };
    },
    detalle_tipo_label() {
      if (!this.tipo) return null;
      return this.detalle_tipo_labels[this.tipo || "O"].label;
    },
    palabras() {
      return this.palabras_claves.length
        ? this.palabras_claves.join(",")
        : null;
    },
    validateA() {
      return (
        [
          "titulo",
          // 'resumen',
          "introduccion",
          // 'problema_inv',
          // 'ref_teorico',
          "objetivo_general",
          // 'objetivo_especifico',
          "metodologia",
          "resultados",
          "conclusiones",
          // 'referencias',
          "evento",
          "tipo",
          "palabras",
        ].some((e) => !this[e]) || this.count > 300
      );
    },
    validateB() {
      return !this.autores.some((e) => e.asesor);
    },
    crear() {
      return this.id_poster === "nuevo";
    },
    count() {
      return this.contar_palabras(
        [
          this.introduccion,
          this.objetivo_general,
          this.metodologia,
          this.resultados,
          this.conclusiones,
        ].join(" ")
      );
    },
  },
  methods: {
    onBreakpointChange({ xsOnly }) {
      this.xs = xsOnly;
    },

    async init() {
      if (!this.usuario) return this.$router.push("/login");

      this.id_poster = this.$route.params.id;
      if (this.crear) {
        this.autores.push(Object.assign(this.usuario, { protected: true }));
        this.id_participante = this.usuario.id_participante;
        this.evento = new Date().getFullYear();
        return;
      }

      if (!parseInt(this.id_poster)) return this.$router.push("/usuario");
      // this.page = 2
      await this.sync();
      if (!isModifiablePoster(this.poster))
        return this.$router.push("/usuario");

      const data = Object.assign({}, this.poster);
      if (data) {
        data.palabras_claves = data.palabras_claves.split(",");
        Object.keys(data).forEach((key) => (this[key] = data[key]));
      }
    },
    contar_palabras(text) {
      if (!text.trim()) return 0;
      text = text.replace(/\r?\n/g, " ");
      text = text.replace(/[ ]+/g, " ");
      text = text.replace(/^ /, "");
      text = text.replace(/ $/, "");
      return text.split(" ").length;
    },
    async save() {
      if (this.crear) {
        this.$store
          .dispatch("poster/addPoster", { poster: this.form })
          .then(() => {
            this.openAlert("success", "La información ha sido guardada.", () =>
              this.$router.push("/usuario")
            );
          })
          .catch(() => {
            this.openAlert("error", "No se pudo guardar la información.");
          });
      } else {
        this.$store
          .dispatch("poster/updatePoster", {
            poster: Object.assign(this.form, { id_poster: this.id_poster }),
          })
          .then(() => {
            this.openAlert("success", "La información ha sido guardada.", () =>
              this.$router.push("/usuario")
            );
          })
          .catch(() => {
            this.openAlert("error", "No se pudo guardar la información.");
          });
      }
    },
    previewPdf() {
      posterService
        .pdf(this.form)
        .then((response) => {
          const file = new Blob([response.data], { type: "application/pdf" });
          this.fileURL = URL.createObjectURL(file);
        })
        .catch(() => {
          this.openAlert("error", "No fue posible generar el pdf");
        });
    },
    openAlert(icon, title, call = null) {
      Swal.fire({ title, icon }).then(() => {
        if (call) call();
      });
    },
    back() {
      if (this.crear) {
        if (this.page > 1) {
          this.page--;
        } else {
          this.$router.push("/usuario");
        }
      } else {
        if (this.page > 2) {
          this.page--;
        } else {
          this.$router.push("/usuario");
        }
      }
    },
  },
});
</script>

<style lang="scss">
.register-form-stepper {
  box-shadow: none !important;
}

.register-form-step-content {
  padding: 0px 16px 16px !important;
}

.preview-pdf {
  width: 100%;
  height: 30rem;
}
</style>
