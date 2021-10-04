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
        @click="alert = true"
        icon="add"
        no-caps
        color="info"
      ></q-btn>
      <q-btn
        rounded
        label="Jugutes"
        class="q-mb-lg"
        @click="tabla"
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
          <template v-slot:body-cell-img>
            <q-td style="background: #F8F8F8;">
              <div
                class="cursor-pointer flex flex-center "
                @click="jugueteMod = true"
              >
                <img src="img/images.svg" alt="" />
              </div>
            </q-td>
          </template>
        </q-table>
      </div>
      <q-dialog v-model="alert">
        <q-card>
          <q-card-section
            ><div class="flex flex-center justify-between m-modal">
              <img src="img/dino.svg" class="q-ml-xl q-pl-md" alt="" />
              <div class="text-h6 q-mr-xl q-pr-xl">Perfil del Producto</div>
            </div>
          </q-card-section>

          <q-card-section class="q-pt-lg flex flex-center ">
            <div class="" style="width:70%">
              <m-input
                filled
                class="q-mb-lg"
                v-model="identificedor"
                label="IDENTIFICADOR"
              >
              </m-input>

              <m-input filled class="q-mb-lg" v-model="name" label="Producto">
              </m-input>
              <m-input filled class="q-mb-lg" v-model="email" label="PRECIO">
              </m-input>
              <m-input filled class="q-mb-lg" v-model="password" label="MARCA">
              </m-input>
            </div>
          </q-card-section>

          <q-card-actions align="right" class="q-mb-xl">
            <q-btn
              rounded
              label="Guardar"
              class="q-mr-xl"
              color="primary"
              @click="addUser"
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
      <q-dialog v-model="jugueteMod">
        <q-card>
          <q-card-section
            ><div class="flex flex-center justify-between m-modal">
              <img src="img/dino.svg" class="q-ml-xl q-pl-md" alt="" />
              <div class="text-h6 q-mr-xl q-pr-xl">Perfil del Producto</div>
            </div>
          </q-card-section>

          <q-card-section class="q-pt-lg flex flex-center ">
            <div class="" style="width:70%">
              <m-input
                filled
                class="q-mb-lg"
                v-model="identificedor"
                label="IDENTIFICADOR"
              >
              </m-input>

              <m-input filled class="q-mb-lg" v-model="name" label="Producto">
              </m-input>
              <m-input filled class="q-mb-lg" v-model="email" label="PRECIO">
              </m-input>
              <m-input filled class="q-mb-lg" v-model="password" label="MARCA">
              </m-input>
            </div>
          </q-card-section>

          <q-card-actions align="right" class="q-mb-xl">
            <q-btn
              rounded
              label="Guardar"
              class="q-mr-xl"
              color="primary"
              @click="addUser"
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </template>
  </MainTempl>
</template>

<script>
import MainTempl from 'src/pages/MainTempl.vue';
import Parse from 'parse';

export default {
  name: 'main-page',
  components: {
    MainTempl,
  },
  data() {
    return {
      loading: false,
      alert: false,
      jugueteMod: false,
      separator: 'none',
      columns: [
        {
          name: 'img',
          required: true,
          label: 'Fotografia',
          headerStyle: 'color: #6D7F9F',
          style: 'background: #F8F8F8;',
          align: 'center',
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
          align: 'center',
        },
      ],
      //.include("")
      data: [
        {
          identificedor: 'IAJ0980LO',
          producto: 'pelota Roja',
          precio: '198.00',
          marca: 'Matel',
          disponibilidad: 'si',
        },
        {
          identificedor: 'IBJ0980MV',
          producto: 'pelota Roja',
          precio: '198.00',
          marca: 'Matel',
          disponibilidad: 'si',
        },
        {
          identificedor: 'IBJ0980FL',
          producto: 'pelota Roja',
          precio: '198.00',
          marca: 'Matel',
          disponibilidad: 'no',
        },
        {
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
    async tabla() {
      let query = new Parse.Query('_User');
      query.equalTo('empresa', 'Matel');
      const results = await query.find();
      /* for (let i = 0; i < results.length; i++) {
        const object = results[i];
        console.log(object.id + ' - ' + object.get('nombre'));
      } */
      let user = Parse.User.current();
      let tienda = user.get('tiendaPointer');
      let query2 = new Parse.Query('TiendaWithJuguetes');
      query2.equalTo('tiendaPointer', tienda);
      query2.include('juguetePointer');
      const igual = await query2.find();
      for (let i = 0; i < igual.length; i++) {
        const object = igual[i];
        console.log(object.id);
      }

      console.log(user.get('nombre'), tienda);
      if (user) {
        alert('En sesion');
      } else {
        alert('No estas logiado');
      }
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
