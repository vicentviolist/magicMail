<template>
  <q-table
    ref="myTable"
    :data="data"
    :columns="columns"
    :filter="filter"
    row-key="id"
    separator="cell"
    :grid="grid"
    :loading="loading"
    :filter-method="filterMethod"
    :pagination.sync="paginationTable"
    table-header-class="text-uppercase"
    :visible-columns="visibleColumns"
    @row-click="emitRow"
    @request="handleRequest"
    :sort-method="serverSide ? undefined : customSort"
  >
    <template v-if="this.$scopedSlots.body" v-slot:body="props">
      <slot name="body" v-bind:row="props.row"> </slot>
    </template>
    <template v-slot:item="props">
      <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4 q-py-sm q-px-sm-sm">
        <div class="q-pa-sm" v-if="loading">
          <q-placeholder animated image avatar />
        </div>
        <q-card v-else class="bg-main-bg rounded-borders q-pt-lg-md">
          <q-item class="q-pb-lg-md">
            <q-item-section avatar>
              <q-avatar size="80px">
                <img
                  :src="
                    props.row[avatarField] && props.row[avatarField].data
                      ? `data:${props.row[avatarField].contentType};base64,${props.row[avatarField].data}`
                      : 'img/default-avatar.png'
                  "
                />
              </q-avatar>
            </q-item-section>

            <q-item-section class="text-left">
              <slot name="grid-body" v-bind:row="props.row"> </slot>
            </q-item-section>
          </q-item>
          <div class="text-right q-pr-sm q-pb-sm text-secondary">
            <slot name="grid-footer" v-bind:row="props.row"> </slot>
          </div>
          <div class="absolute-top-right">
            <q-btn-dropdown
              dense
              flat
              rounded
              color="secondary"
              content-class="bg-main-bg text-grey-8"
            >
              <q-list v-for="option in menuGrid" :key="option.id">
                <q-item
                  clickable
                  v-close-popup
                  @click="handleMenuClick(option, props.row)"
                >
                  <q-item-section>
                    <q-item-label>{{
                      getLabelMenu(option, props.row)
                    }}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>
          </div>
        </q-card>
      </div>
    </template>
    <template v-slot:bottom="scope">
      <div class="row items-center full-width justify-center">
        <div class="text-body2 q-mr-sm">
          {{ paginationTable.page }} / {{ pagesNumber }}
        </div>
        <q-btn
          icon="eva-arrowhead-left-outline"
          color="secondary"
          round
          dense
          flat
          :disable="scope.isFirstPage"
          @click="scope.firstPage"
        />

        <q-btn
          icon="eva-arrow-ios-back-outline"
          color="secondary"
          round
          dense
          flat
          :disable="scope.isFirstPage"
          @click="scope.prevPage"
        />
        <div class="text-body2">{{ paginationTable.page }}</div>
        <q-btn
          icon="eva-arrow-ios-forward-outline"
          color="secondary"
          round
          dense
          flat
          :disable="scope.isLastPage"
          @click="scope.nextPage"
        />

        <q-btn
          icon="eva-arrowhead-right-outline"
          color="secondary"
          round
          dense
          flat
          :disable="scope.isLastPage"
          @click="scope.lastPage"
        />
        <q-select
          class="q-pl-md"
          v-model="paginationTable.rowsPerPage"
          :options="rowsPerPageOptions"
          borderless
          color="secondary"
          @input="resetPage()"
        />
        <div v-if="showAddBtn" class="absolute" style="right:0; bottom:15px">
          <q-btn icon="add" color="secondary" round @click="handleAdd()" />
        </div>
      </div>
    </template>
    <template v-slot:no-data>
      <div class="row justify-center fit">
        <div class="col text-center">
          {{ $t('gral.noData') }}
        </div>
      </div>
      <div v-if="showAddBtn" class="absolute" style="right:0; bottom:15px">
        <q-btn icon="add" color="secondary" round @click="handleAdd()" />
      </div>
    </template>
  </q-table>
</template>

<script>
export default {
  name: 'e-table',
  props: {
    data: {
      type: [Object, Array],
      description: 'El mismo formato aceptado por Quasar',
      required: true,
    },
    columns: {
      type: [Object, Array],
      description: 'El mismo formato aceptado por Quasar',
      required: true,
    },
    grid: {
      type: Boolean,
      default: false,
      required: false,
    },
    avatarField: {
      type: String,
      description:
        'Indica el nombre del campo de donde se obtendra la imagen para colocar en el avatar en la vista tipo grid.',
      default: null,
      required: false,
    },
    menuGrid: {
      type: [Array],
      description:
        'Se debe de enviar las opciones del menú que se muestra en la vista grid. Cada menu debe de tener un id y label. Ej. [{id,label},{id, label},...]',
      required: false,
    },
    showAddBtn: {
      type: Boolean,
      default: true,
      description: 'Mostrar o ocultar el botón para agregar ',
      required: false,
    },
    visibleColumns: {
      type: Array,
      default: () => [],
      required: false,
    },
    filter: {
      type: [String, Object],
      description: 'Información a buscar en la base de datos.',
      default: undefined,
      required: false,
    },
    filterMethod: {
      type: [Function],
      description:
        'NECESARIO EN MODO NORMAL cuando filter es un Objecto. Método que permite filtrar la información ya cargada en la tabla.',
      default: undefined,
      required: false,
    },
    loading: {
      type: Boolean,
      description:
        'NECESARIO EN MODO SERVER-SIDE. Indicador de cargando información en la tabla.',
      default: false,
      required: false,
    },
    totalRowNumber: {
      type: Number,
      description:
        'NECESARIO EN MODO SERVER-SIDE. Total de registros obtenidos de la consulta al servidor.',
      default: () => 0,
    },
    serverSide: {
      type: Boolean,
      description:
        'NECESARIO EN MODO SERVER-SIDE. Indicador de que la carga de tipo server side',
      default: true,
      required: false,
    },
  },
  data() {
    return {
      paginationAux: {},
      paginationTable: {},
    };
  },
  computed: {
    // indica las páginas totales de la tabla
    pagesNumber() {
      let pagsNumber = 0;
      if (this.serverSide) {
        pagsNumber =
          this.paginationTable.rowsNumber / this.paginationTable.rowsPerPage;
      } else {
        pagsNumber = this.data.length / this.paginationTable.rowsPerPage;
      }
      return Math.ceil(pagsNumber);
    },
    // listado de opciones que indican cuantos registros se mostrarán por página
    rowsPerPageOptions() {
      return this.grid ? [6, 12, 18] : [5, 10, 20, 30];
    },
  },
  watch: {
    // ÚNICAMENTE PARA SERVER-SIDE. Indica el número total de registros.
    totalRowNumber(newValue) {
      if (!this.serverSide) return;
      this.paginationTable['rowsNumber'] = newValue;
    },
    grid(newValue) {
      this.paginationTable.rowsPerPage = this.rowsPerPageOptions[0];
      if (this.serverSide) {
        this.reloadData();
      }
    },
    pagination: {
      handler(newValue) {
        this.paginationTable = { ...newValue };
      },
      deep: true,
    },
    // ÚNICAMENTE PARA SERVER-SIDE. Actualiza los filtros y paginación en cada consulta nueva.
    loading(newValue) {
      if (!this.serverSide) return;
      if (!newValue) {
        this.paginationTable = { ...this.paginationAux };
        this.paginationTable.rowsNumber = this.totalRowNumber;
      }
    },
  },
  beforeCreate() {
    if (
      typeof this.$options.propsData.filter === 'object' &&
      typeof this.$options.propsData.filterMethod === undefined
    ) {
      console.error(
        'Tu filter es un objecto, por lo tanto, debes de agregar el prop filterMethod a ETable que indique como filtrar la información.',
      );
    }
  },
  created() {
    if (this.serverSide) {
      this.paginationTable = {
        sortBy: '',
        descending: false,
        page: 1,
        rowsPerPage: this.rowsPerPageOptions[0],
        rowsNumber: this.totalRowNumber,
      };
      this.reloadData();
    } else {
      this.paginationTable = {
        sortBy: '',
        descending: false,
        page: 1,
        rowsPerPage: this.rowsPerPageOptions[0],
      };
    }
  },
  methods: {
    // ÚNICAMENTE PARA SERVER-SIDE. Setea los filtros y paginación previo a lanzar la nueva petición al servidor.
    reloadData() {
      let props = {
        filter: this.filter,
        pagination: this.paginationTable,
      };
      this.handleRequest(props);
    },
    getLabelMenu(option, row) {
      try {
        if (option.label) return option.label;
        let id = option.id;
        let value = row[id];
        let label = option.labels[+!value];
        return label;
      } catch (err) {
        console.log(err);
      }
    },
    resetPage() {
      this.$refs.myTable.firstPage();
      if (this.serverSide) {
        this.reloadData();
      }
    },
    handleMenuClick(option, item) {
      this.$emit('onMenuClick', { option, item });
    },
    handleAdd() {
      this.$emit('onMenuAdd');
    },
    emitRow(evt, row) {
      this.$emit('selectedRow', row);
    },
    // ÚNICAMENTE PARA SERVER-SIDE. Emite un evento que permite lanzar la petición de consulta del lado del componente padre.
    handleRequest(props) {
      this.paginationAux = { ...props.pagination };
      this.$emit('onRequest', props);
    },
    customSort(rows, sortBy, descending) {
      const data = [...rows];

      if (sortBy) {
        data.sort((a, b) => {
          const x = descending ? b : a;
          const y = descending ? a : b;
          let typeColumn = this.columns.find(col => col.name === sortBy).type;
          if (typeColumn !== 'Number') {
            // string sort
            return x[sortBy]
              .toString()
              .toLowerCase()
              .localeCompare(y[sortBy].toString().toLowerCase());
          } else {
            // numeric sort
            return parseFloat(x[sortBy]) - parseFloat(y[sortBy]);
          }
        });
      }

      return data;
    },
  },
};
</script>
