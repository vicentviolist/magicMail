<template>
  <MainTempl>
    <template v-slot:back>
      <div class="flex justify-start absolute-top full-width" @click="back()">
        <q-btn
          flat
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
        <div class="text-h4 m-y-auto">Reporte Pedidos</div>
      </div>
    </template>
    <template v-slot:desc>
      <div class="q-mb-lg" style="width:35%">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos sapiente autem.
      </div>
    </template>
    <template v-slot:table>
      <div class="full-width flex flex-center q-my-lg">
        <q-input
          rounded
          outlined
          style="width:55%"
          debounce="300"
          v-model="filter"
          placeholder="Buscar Reporte"
        >
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>
      <div class="full-width flex flex-center"></div>
      <div class="flex full-width flex flex-center justify-end q-mb-sm">
        <q-btn
          :loading="loading"
          rounded
          @click="exportTable"
          type="submit"
          class="q-ml-lg"
          color="primary"
          no-caps
          label="Descargar"
        />
      </div>
      <div class="full-width flex flex-center">
        <q-table
          style="height: 300px; width:55%;"
          :data="data"
          :columns="columns"
          :loading="loading"
          row-key="id"
          :filter="filter"
          virtual-scroll
          :rows-per-page-options="[0]"
        >
        </q-table>
      </div>
    </template>
  </MainTempl>
</template>

<script>
import MainTempl from 'src/pages/MainTempl.vue';
import Parse from 'parse';
import { exportFile } from 'quasar';

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
      filter: null,
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
          align: 'center',
        },
        {
          name: 'user',
          label: 'Usuario',
          headerStyle: 'color: #6D7F9F',
          style: 'background: #F8F8F8;',
          field: 'user',
          align: 'center',
        },
        {
          name: 'costo',
          label: 'Costo',
          headerStyle: 'color: #6D7F9F',
          style: 'background: #F8F8F8;',
          field: 'costo',
          format: val => `$${val}`,
          align: 'center',
        },
        {
          name: 'status',
          label: 'Status',
          headerStyle: 'color: #6D7F9F',
          style: 'background: #F8F8F8;',
          field: 'status',
          align: 'center',
        },
      ],
      data: [],
    };
  },
  created() {
    this.table();
  },
  methods: {
    back() {
      this.$router.push({ name: 'admi' }).catch(e => console.log(e));
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
    async table() {
      this.loading = true;
      let compras = Parse.Object.extend('Compras');
      let query = new Parse.Query(compras);
      let results = await query.find();

      for (let i = 0; i < results.length; i++) {
        let pedido = results[i];

        let jugueteria = pedido.get('empresa');
        let costo = pedido.get('total');
        let registro = pedido.attributes.createdAt.toLocaleDateString();

        let usuarioPoint = results[i].get('userPointer');
        let identificador = usuarioPoint.id;
        let user = usuarioPoint.get('username');
        let ob = { identificador, costo, registro, user };
        this.data.push(ob);
      }
      this.loading = false;
    },
  },
};
</script>
