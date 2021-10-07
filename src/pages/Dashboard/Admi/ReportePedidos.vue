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
      <div class="full-width flex flex-center q-my-lg"></div>
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
        </q-table>
      </div>
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
    async table() {
      /* let user = Parse.User.current();
      let tienda = user.get('tiendaPointer');
      let query2 = new Parse.Query('TiendaWithJuguetes');
      query2.equalTo('tiendaPointer', tienda);
      query2.include('juguetePointer');
      const igual = await query2.find();
      for (let i = 0; i < igual.length; i++) {
        const object = igual[i];
        const juguete = igual[i].get('juguetePointer');
        let producto = juguete.get('nombre');
        let image = juguete.get('icon').url();
        let identificador = object.id;
        let precio = igual[i].get('unitaryPrice');
        let marca = juguete.get('marca');
        let disponibilidad = igual[i].get('stock');
        let ob = { producto, image, identificador, precio, disponibilidad, marca };
        this.data.push(ob);
      } */

      /*  const GameScore = Parse.Object.extend("GameScore");
const query = new Parse.Query(GameScore);
query.equalTo("playerName", "Dan Stemkoski");
const results = await query.find();
alert("Successfully retrieved " + results.length + " scores.");
// Do something with the returned Parse.Object values
for (let i = 0; i < results.length; i++) {
  const object = results[i];
  alert(object.id + ' - ' + object.get('playerName'));
} */

      this.loading = true;
      const compras = Parse.Object.extend('Compras');
      const query = new Parse.Query(compras);
      const results = await query.find();

      for (let i = 0; i < results.length; i++) {
        const object = results[i];
        let identificador = object.id;
        let jugueteria = object.get('empresa');
        let costo = object.get('total');
        let registro = object.get('umpdateAt');

        let usuarioPoint = results[i].get('userPointer');
        let user = usuarioPoint.get('username');
        let ob = { identificador, costo, registro, user };
        this.data.push(ob);
      }
      this.loading = false;
    },
  },
};
</script>
