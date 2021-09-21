<template>
  <MainTempl>
    <template v-slot:back>
      <div class="flex justify-start  absolute-top full-width">
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
          description=""
          iconFondo="img/mini-inventarios.svg"
          color="bg-inventario"
        />
        <div class="text-h4 m-y-auto">Inventarios</div>
      </div>
    </template>
    <template v-slot:desc>
      <div class="q-mb-lg" style="width:35%">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos sapiente autem.
      </div>
      <q-btn
        rounded
        label="Nuevo Juguete"
        class="q-mb-lg"
        icon="add"
        no-caps
        color="info"
      >
      </q-btn>
    </template>
    <template v-slot:table>
      <div class="full-width flex flex-center">
        <q-table
          style="height: 300px; width:55%;"
          :data="data"
          :columns="columns"
          row-key="id"
          :filter="filter"
          virtual-scroll
          :rows-per-page-options="[0]"
        >
          <template v-slot:header-selection="scope">
            <q-toggle v-model="scope.name" />
          </template>
        </q-table>
      </div>
    </template>
  </MainTempl>
</template>

<script>
import MainTempl from 'src/pages/MainTempl.vue';

export default {
  name: 'main-page',
  components: {
    MainTempl,
  },
  data() {
    return {
      loading: false,
      separator: 'none',
      columns: [
        {
          name: 'name',
          required: true,
          label: 'Nombre',
          headerStyle: 'color: #6D7F9F',
          style: 'background: #F8F8F8;',
          align: 'left',
          field: row => row.name,
          sortable: true,
        },
        {
          name: 'identificedor',
          align: 'center',
          headerStyle: 'color: #6D7F9F',
          style: 'background: #F8F8F8;',
          label: 'Identificador',
          field: 'identificedor',
          sortable: true,
        },
        {
          name: 'producto',
          label: 'producto',
          field: 'producto',
          sortable: true,
          headerStyle: 'color: #6D7F9F',
          style: 'background: #F8F8F8;',
        },
        {
          name: 'precio',
          label: 'Precio',
          headerStyle: 'color: #6D7F9F',
          style: 'background: #F8F8F8; color:red;',
          format: val => `$${val}`,
          field: 'precio',
        },
        {
          name: 'marca',
          label: 'Marca',
          headerStyle: 'color: #6D7F9F',
          style: 'background: #F8F8F8;',
          field: 'marca',
        },
        {
          name: 'disponibilidad',
          label: 'Disponibilidad',
          headerStyle: 'color: #6D7F9F',
          style: 'background: #F8F8F8;',
          field: 'disponibilidad',
        },
      ],
      data: [
        {
          name: 'Vicente Olivares',
          identificedor: 'IAJ0980LO',
          producto: 'pelota Roja',
          precio: '198.00',
          marca: 'Matel',
          disponibilidad: 'si',
        },
        {
          name: 'Juan Perez',
          identificedor: 'IBJ0980MV',
          producto: 'pelota Roja',
          precio: '198.00',
          marca: 'Matel',
          disponibilidad: 'si',
        },
        {
          name: 'Juan Perez',
          identificedor: 'IBJ0980FL',
          producto: 'pelota Roja',
          precio: '198.00',
          marca: 'Matel',
          disponibilidad: 'no',
        },
        {
          name: 'Juan Perez',
          identificedor: 'IBJ0980PV',
          producto: 'pelota Roja',
          precio: '198.00',
          marca: 'Matel',
          disponibilidad: 'si',
        },
      ],
    };
  },
  methods: {
    back() {
      this.$router.push({ name: 'vendedor' }).catch(e => console.log(e));
    },
    onRequest(props) {
      const { page, rowsPerPage, sortBy, descending } = props.pagination;
      const filter = props.filter;

      this.loading = true;

      // emulate server
      setTimeout(() => {
        // update rowsCount with appropriate value
        this.pagination.rowsNumber = this.getRowsNumberCount(filter);

        // get all rows if "All" (0) is selected
        const fetchCount =
          rowsPerPage === 0 ? this.pagination.rowsNumber : rowsPerPage;

        // calculate starting row of data
        const startRow = (page - 1) * rowsPerPage;

        // fetch data from "server"
        const returnedData = this.fetchFromServer(
          startRow,
          fetchCount,
          filter,
          sortBy,
          descending,
        );

        // clear out existing data and add new
        this.data.splice(0, this.data.length, ...returnedData);

        // don't forget to update local pagination object
        this.pagination.page = page;
        this.pagination.rowsPerPage = rowsPerPage;
        this.pagination.sortBy = sortBy;
        this.pagination.descending = descending;

        // ...and turn of loading indicator
        this.loading = false;
      }, 1500);
    },

    // emulate ajax call
    // SELECT * FROM ... WHERE...LIMIT...
    fetchFromServer(startRow, count, filter, sortBy, descending) {
      const data = filter
        ? this.original.filter(row => row.name.includes(filter))
        : this.original.slice();

      // handle sortBy
      if (sortBy) {
        const sortFn =
          sortBy === 'desc'
            ? descending
              ? (a, b) => (a.name > b.name ? -1 : a.name < b.name ? 1 : 0)
              : (a, b) => (a.name > b.name ? 1 : a.name < b.name ? -1 : 0)
            : descending
            ? (a, b) => parseFloat(b[sortBy]) - parseFloat(a[sortBy])
            : (a, b) => parseFloat(a[sortBy]) - parseFloat(b[sortBy]);
        data.sort(sortFn);
      }

      return data.slice(startRow, startRow + count);
    },

    // emulate 'SELECT count(*) FROM ...WHERE...'
    getRowsNumberCount(filter) {
      if (!filter) {
        return this.original.length;
      }
      let count = 0;
      this.original.forEach(treat => {
        if (treat.name.includes(filter)) {
          ++count;
        }
      });
      return count;
    },
  },
};
</script>
