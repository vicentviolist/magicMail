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
      <div class="full-width flex flex-center q-my-lg"></div>
      <div class="full-width flex flex-center">
        <q-table
          style="height: 300px; width:55%;"
          :data="data"
          :columns="columns"
          row-key="id"
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

export default {
  name: 'main-page',
  components: {
    MainTempl,
  },
  data() {
    return {
      loading: false,
      columns: [
        {
          name: 'name',
          required: true,
          label: 'Nombre',
          align: 'left',
          field: row => row.name,
          sortable: true,
        },
        {
          name: 'identificedor',
          align: 'center',
          label: 'Identificador',
          field: 'identificedor',
          sortable: true,
        },
        { name: 'registro', label: 'Registro', field: 'registro', sortable: true },
        { name: 'email', label: 'Correo Electronico', field: 'email' },
        { name: 'password', label: 'Password', field: 'password' },
        { name: 'ultimoPedido', label: 'Último Pedido', field: 'ultimoPedido' },
      ],
      data: [
        {
          name: 'Vicente Olivares',
          identificedor: 'IAJ0980LO',
          registro: '12/02/2021',
          email: 'user.test@test.mx',
          password: '*************',
          ultimoPedido: 'OPG092089',
        },
        {
          name: 'Juan Perez',
          identificedor: 'IBJ0980FV',
          registro: '12/02/2021',
          email: 'user.test@test.mx',
          password: '*************',
          ultimoPedido: 'OPG092090',
        },
        {
          name: 'Juan Perez',
          identificedor: 'IBJ0980FV',
          registro: '12/02/2021',
          email: 'user.test@test.mx',
          password: '*************',
          ultimoPedido: 'OPG092090',
        },
        {
          name: 'Juan Perez',
          identificedor: 'IBJ0980FV',
          registro: '12/02/2021',
          email: 'user.test@test.mx',
          password: '*************',
          ultimoPedido: 'OPG092090',
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
