<template>
  <Worker :filter="/^posterDetails/" auth>
    <v-card class="local-card" elevation="6">
      <BackButton :target="{ name: 'usuario' }"></BackButton>
      <v-card-title class="display-1 font-weight-thin justify-center mb-8">
        <div class="card-title-text">Evaluación de Artículo</div>
      </v-card-title>
      <!-- <v-card-subtitle class="title text-center">
        Evaluación de Póster
      </v-card-subtitle> -->
      <v-card-text>
        <div class="px-3 mb-2">
          <v-expansion-panels>
            <v-expansion-panel class="white--text">
              <v-expansion-panel-header color="blue-grey">
                <v-alert dense type="info" color="blue-grey" class="mb-0 pa-0">
                  {{ criterios.titulo }}
                </v-alert>
                <template v-slot:actions>
                  <v-icon color="white">
                    $expand
                  </v-icon>
                </template>
              </v-expansion-panel-header>
              <v-expansion-panel-content color="blue-grey">
                <ul>
                  <li
                    v-for="(criterio, index) in criterios.criterios"
                    :key="index"
                  >
                    {{ criterio }}
                  </li>
                </ul>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>

          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Buscar"
            single-line
            hide-details
          ></v-text-field>
        </div>
      </v-card-text>
    </v-card>
  </Worker>
</template>
<script lang="ts">
import Vue from 'vue'
import BackButton from '@/components/BackButton.vue'
import Worker from '@/components/Worker.vue'

export interface Criterios {
  titulo: string
  criterios: string[]
}

export interface AdminComponentData {
  search: string | null
  criterios: Criterios
}

export default Vue.extend({
  components: {
    BackButton,
    Worker,
  },

  data: (): AdminComponentData => ({
    search: null,
    criterios: {
      titulo:
        'Para la evaluación de las propuestas tenga en cuenta los siguientes ítems:',
      criterios: [
        'El título sintetiza el tema del resumen.',
        'Las palabras clave permiten determinar el campo o subcampo del estudio.',
        'Se describen brevemente el(los) objetivo(s) de la investigación.',
        'Se presenta de manera sucinta el diseño metodológico.',
        'Se sintetizan los principales resultados.',
        'Se describe de forma clara y precisa las principales conclusiones.',
        'Existe coherencia entre el título, palabras clave y resumen.',
      ],
    },
  }),
})
</script>
