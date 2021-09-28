<template>
  <q-card class="e-graph no-shadow">
    <q-card-section> </q-card-section>
    <div class="relative-position absolute-center" v-if="noData">
      {{ $t('gral.noData') }}
    </div>
    <div v-else-if="linechart">
      <div v-for="(dataCollection, index) in dataCollections" :key="index">
        <div class="flex flex-center" v-if="loading">
          <q-spinner-tail size="50px" color="orange-4" />
        </div>
        <linechart v-else :chartData="dataCollection" />
      </div>
    </div>
    <div v-else-if="barchart">
      <div v-for="(dataCollection, index) in dataCollections" :key="index">
        <div class="flex flex-center" v-if="loading">
          <q-spinner-tail size="50px" color="orange-4" />
        </div>
        <bar v-else style="height: 260px" :chartData="dataCollection" />
      </div>
    </div>
    <div v-else class="q-px-sm">
      <div v-for="(dataCollection, index) in dataCollections" :key="index">
        <div class="flex flex-center" v-if="loading">
          <q-spinner-tail size="50px" color="orange-4" />
        </div>
        <doughnut
          v-else
          style="height: 210px"
          title="478"
          :chartData="dataCollection"
        />
        <div class="text-center q-py-md">{{ dataCollection.title }}</div>
      </div>
    </div>
  </q-card>
</template>
<script>
import Doughnut from 'src/components/graphs/doughnut';
import Linechart from 'src/components/graphs/linechart';
import Bar from 'src/components/graphs/bar';

export default {
  components: {
    Doughnut,
    Linechart,
    Bar,
  },
  model: {
    prop: 'value',
    event: 'input',
  },
  props: {
    value: {
      type: [String, Object],
    },
    filterLabel: {
      type: String,
      default: 'Name of institution',
    },
    filterOptions: {
      type: Array,
    },
    dataCollections: {
      type: Array,
    },
    linechart: {
      type: Boolean,
      description: 'Indica si la gráfica a usar es un grafica linear',
      default: false,
    },
    barchart: {
      type: Boolean,
      description: 'Indica si la gráfica a usar es una grafica de barras',
      default: false,
    },
    disableSelect: {
      type: Boolean,
      description: 'Permite desactivar el filtro del select',
      default: false,
    },
    loading: {
      type: Boolean,
      description: 'Permite activar el loading para realizar bien el render',
      default: false,
    },
    noData: {
      type: Boolean,
      description:
        'Permite activar el mensaje de No data cuando el label principal de la gráfica esta en 0',
      default: false,
    },
    hideSelect: {
      type: Boolean,
      description: 'Permite ocultar el select',
      default: false,
    },
  },
};
</script>

<style lang="scss">
.e-graph {
  .q-field {
    &__label,
    &__append {
      font-size: 0.75rem;
    }
  }
}
</style>
