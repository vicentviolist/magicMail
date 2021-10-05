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
      this.$router.push({ name: 'admi' }).catch(e => console.log(e));
    },
  },
};
</script>
