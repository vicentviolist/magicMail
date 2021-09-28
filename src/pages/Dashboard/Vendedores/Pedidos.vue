<template>
  <MainTempl>
    <template v-slot:back>
      <div class="flex justify-start absolute-top full-width">
        <q-btn
          flat
          @click="back()"
          no-caps
          label="Regresar"
          icon="arrow_back_ios"
          class="q-ml-sm text-weight-light"
        />
      </div>
    </template>
    <template v-slot:title>
      <div class="row flex flex-center">
        <m-card
          isMini
          color="bg-accent"
          iconFondo="img/mini-report.svg"
          description=""
        />
        <div class="text-h4 m-y-auto">Reporte de Pedidos</div>
      </div>
    </template>
    <template v-slot:desc>
      <div class="q-mb-lg" style="width:35%">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos sapiente autem.
      </div>
      <div class="q-mb-lg flex flex-center row">
        <div class="q-mr-lg">
          <q-select
            outlined
            rounded
            v-model="filterData.identificador"
            use-input
            input-debounce="0"
            label="Identificador filter"
            :options="options"
            @filter="filterFn"
            style="width: 250px"
            behavior="menu"
          >
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey">
                  No results
                </q-item-section>
              </q-item>
            </template>
          </q-select>
        </div>
        <div>
          <q-select
            outlined
            rounded
            v-model="filterData.status"
            use-input
            input-debounce="0"
            label="Status filter"
            :options="options"
            @filter="filterFn"
            style="width: 250px"
            behavior="menu"
          >
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey">
                  No results
                </q-item-section>
              </q-item>
            </template>
          </q-select>
        </div>
        <q-btn
          :loading="loading"
          round
          size="20px"
          type="submit"
          class="q-ml-lg"
          color="primary"
          icon="search"
          no-caps
        />
      </div>
    </template>
    <template v-slot:table>
      <div class="flex flex- justify-end q-my-lg" style="width:55%">
        <div class="flex justify-end">
          <q-btn
            :loading="loading"
            rounded
            @click="exportTable"
            type="submit"
            class="q-mr-lg"
            color="primary"
            no-caps
            label="Descargar"
          />
          <q-btn
            v-if="isGraph == false"
            :loading="loading"
            rounded
            type="submit"
            icon="signal_cellular_alt"
            @click="graphSection"
            class=""
            no-caps
            label="Grafica"
          />
          <q-btn
            v-if="isGraph == true"
            :loading="loading"
            rounded
            type="submit"
            icon="format_list_numbered_rtl"
            @click="tableSection"
            class=""
            no-caps
            label="Lista"
          />
        </div>
      </div>
      <div class="full-width flex flex-center" v-if="isGraph == false">
        <q-table
          style="height: 300px; width:55%;"
          :data="data"
          :columns="columns"
          row-key="id"
          :filter="filter"
          virtual-scroll
          :rows-per-page-options="[0]"
        >
        </q-table>
      </div>
      <div v-if="isGraph == true"><AreaChart /></div>
    </template>
  </MainTempl>
</template>

<script>
import MainTempl from 'src/pages/MainTempl.vue';
import { exportFile } from 'quasar';
import Chart from 'chart.js';

function wrapCsvValue(val, formatFn) {
  let formatted = formatFn !== void 0 ? formatFn(val) : val;

  formatted = formatted === void 0 || formatted === null ? '' : String(formatted);

  formatted = formatted.split('"').join('""');
  return `"${formatted}"`;
}

export default {
  name: 'main-page',
  components: {
    MainTempl,
  },
  data() {
    return {
      loading: false,
      filterData: {
        identificador: null,
        status: null,
      },
      isGraph: false,
      columns: [
        {
          name: 'identificador',
          required: true,
          label: 'Identificador',
          headerStyle: 'color: #6D7F9F',
          style: 'background: #F8F8F8;',
          align: 'left',
          field: 'identificador',
        },
        {
          name: 'jugueteria',
          align: 'center',
          headerStyle: 'color: #6D7F9F',
          style: 'background: #F8F8F8;',
          label: 'Jugueteria',
          field: 'jugueteria',
        },
        {
          name: 'registro',
          label: 'Registro',
          field: 'registro',
          headerStyle: 'color: #6D7F9F',
          style: 'background: #F8F8F8;',
        },
        {
          name: 'user',
          label: 'Usuario',
          headerStyle: 'color: #6D7F9F',
          style: 'background: #F8F8F8;',
          field: 'user',
        },
        {
          name: 'costo',
          label: 'Costo',
          headerStyle: 'color: #6D7F9F',
          style: 'background: #F8F8F8;',
          field: 'costo',
        },
        {
          name: 'status',
          label: 'Status',
          headerStyle: 'color: #6D7F9F',
          style: 'background: #F8F8F8;',
          field: 'status',
        },
      ],
      data: [
        {
          jugueteria: 'Jugueteria ABC',
          identificador: 'IAJ0980LO',
          registro: '12/02/2021',
          user: 'user.test@test.mx',
          costo: 1879,
          status: 'Recibido',
        },
        {
          jugueteria: 'Jugueteria ABC',
          identificador: 'IBJ0980FV',
          registro: '12/02/2021',
          user: 'user.test@test.mx',
          costo: 1879,
          status: 'En camino',
        },
        {
          jugueteria: 'Jugueteria ABC',
          identificador: 'IBJ0980FV',
          registro: '12/02/2021',
          user: 'user.test@test.mx',
          costo: 1879,
          status: 'En Camino',
        },
        {
          jugueteria: 'Jugueteria ABC',
          identificador: 'IBJ0980FV',
          registro: '12/02/2021',
          user: 'user.test@test.mx',
          costo: 1879,
          status: 'Recibido',
        },
      ],
    };
  },
  methods: {
    back() {
      this.$router.push({ name: 'vendedor' }).catch(e => console.log(e));
    },
    graphSection() {
      this.isGraph = true;
    },
    tableSection() {
      this.isGraph = false;
    },
    exportTable() {
      const content = [this.columns.map(col => wrapCsvValue(col.label))]
        .concat(
          this.data.map(row =>
            this.columns
              .map(col =>
                wrapCsvValue(
                  typeof col.field === 'function'
                    ? col.field(row)
                    : row[col.field === void 0 ? col.name : col.field],
                  col.format,
                ),
              )
              .join(','),
          ),
        )
        .join('\r\n');
      const status = exportFile('Reporte-de-Peidos.csv', content, 'text/csv');
      if (status !== true) {
        this.$q.notify({
          message: 'Browser denied file download...',
          color: 'negative',
          icon: 'warning',
        });
      }
    },
  },
};
</script>
