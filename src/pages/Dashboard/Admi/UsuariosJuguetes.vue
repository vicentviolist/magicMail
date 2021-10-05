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
          description=""
          color="bg-secondary"
          iconFondo="img/mini-blocks.svg"
        />
        <div class="text-h4 m-y-auto">Usuarios Juguetes</div>
      </div>
    </template>
    <template v-slot:desc>
      <div class="q-mb-lg" style="width:35%">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos sapiente quas
        quis tenetur voluptate officiis expedita eligendi labore saepe, eminima
        autem.
      </div>
      <q-btn
        rounded
        label="Nueva Jugueteria"
        icon="add"
        color="info"
        @click="alert = true"
      >
      </q-btn>
    </template>
    <template v-slot:table>
      <div class="full-width flex flex-center q-my-lg">
        <q-input
          rounded
          outlined
          style="width:55%"
          debounce="300"
          v-model="filter"
          placeholder="Buscar Cliente"
        >
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>
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
          <template v-slot:body-cell-identificador="props">
            <q-td :props="props">
              <div
                class="cursor-pointer flex flex-center"
                @click="openModal(props.row.identificador)"
              >
                {{ props.row.identificador }}
              </div>
            </q-td>
          </template>
        </q-table>
      </div>
      <q-dialog v-model="alert">
        <q-card>
          <q-card-section>
            <div class="flex flex-center justify-between m-modal">
              <div class="text-h6 q-mr-xl">Perfil del Producto</div>
              <q-btn flat @click="closeModal" round color="primary" icon="close" />
            </div>
          </q-card-section>

          <q-card-section class="q-pt-lg flex flex-center m-modal">
            <div class="" style="width:70%">
              <m-input
                filled
                class="q-mb-lg"
                v-model="jugueteria"
                label="JUGUETERIA"
              >
              </m-input>
              <m-input
                filled
                class="q-mb-lg"
                v-model="identificador"
                label="IDENTIFICADOR"
              >
              </m-input>
              <m-input
                filled
                class="q-mb-lg"
                v-model="email"
                label="CORREO ELECTRONICO"
              >
              </m-input>
              <m-input filled class="q-mb-lg" v-model="password" label="PASSWORD">
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

export default {
  name: 'main-page',
  components: {
    MainTempl,
  },
  data() {
    return {
      loading: null,
      jugueteria: null,
      identificador: null,
      email: null,
      password: null,
      editMode: null,
      alert: null,
      indexToEdit: null,
      filter: '',
      columns: [
        {
          name: 'jugueteria',
          required: true,
          label: 'Jugueteria',
          headerStyle: 'color: #6D7F9F',
          style: 'background: #F8F8F8;',
          align: 'left',
          field: 'jugueteria',
        },
        {
          name: 'identificador',
          align: 'center',
          headerStyle: 'color: #6D7F9F',
          style: 'background: #F8F8F8;',
          label: 'Identificador',
          field: 'identificador',
        },
        {
          name: 'registro',
          label: 'Registro',
          field: 'registro',
          headerStyle: 'color: #6D7F9F',
          style: 'background: #F8F8F8;',
        },
        {
          name: 'email',
          label: 'Correo Electronico',
          headerStyle: 'color: #6D7F9F',
          style: 'background: #F8F8F8;',
          field: 'email',
        },
        {
          name: 'password',
          label: 'Password',
          headerStyle: 'color: #6D7F9F',
          style: 'background: #F8F8F8;',
          field: 'password',
        },
        {
          name: 'ultimoPedido',
          label: 'Último Pedido',
          headerStyle: 'color: #6D7F9F',
          style: 'background: #F8F8F8;',
          field: 'ultimoPedido',
        },
      ],
      data: [
        {
          jugueteria: 'Jugueteria ABC',
          identificador: 'IAJ0980LO',
          registro: '12/02/2021',
          email: 'user.test@test.mx',
          password: '*************',
          ultimoPedido: 'OPG092089',
        },
        {
          jugueteria: 'Jugueteria ABC',
          identificador: 'IBJ65980FV',
          registro: '12/02/2021',
          email: 'user.test@test.mx',
          password: '*************',
          ultimoPedido: 'OPG092090',
        },
        {
          jugueteria: 'Jugueteria ABC',
          identificador: 'IBJ45980FV',
          registro: '12/02/2021',
          email: 'user.test@test.mx',
          password: '*************',
          ultimoPedido: 'OPG092090',
        },
        {
          jugueteria: 'Jugueteria ABC',
          identificador: 'IBJ0350FV',
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
    closeModal() {
      this.identificador = null;
      this.jugueteria = null;
      this.email = null;
      this.password = null;
      this.alert = false;
    },
    openModal(id) {
      //--> se tiene qu llamar el action que consulte por id
      this.indexToEdit = this.data.findIndex(user => user.identificador == id);
      //<-- aqui termina la consulta al back
      this.identificador = this.data[this.indexToEdit].identificador;
      this.email = this.data[this.indexToEdit].email;
      this.jugueteria = this.data[this.indexToEdit].jugueteria;
      this.password = this.data[this.indexToEdit].password;
      this.alert = true;
      this.editMode = true;
    },
    addUser() {
      this.alert = false;
      let identificador = this.identificador;
      let email = this.email;
      let jugueteria = this.jugueteria;
      let password = this.password;
      var hoy = new Date();
      let registro =
        hoy.getDate() + '/' + (hoy.getMonth() + 1) + '/' + hoy.getFullYear();
      let ob = {
        identificador,
        jugueteria,
        email,
        password,
        registro,
      };
      if (this.editMode) {
        // llamar a la api de PUT por id
        let userId = this.data.map((user, index) => {
          if (index == this.indexToEdit) {
            user.identificador = this.identificador;
            user.jugueteria = this.jugueteria;
            user.email = this.email;
            user.password = this.password;
          }
          return user;
        });
        this.data = userId;
      } else {
        // llamar a la api de POST
        this.data.push(ob);
      }
      // limpiar datos del formulario
      this.identificador = null;
      this.email = null;
      this.password = null;
      this.editMode = false;
      this.jugueteria = false;
    },
  },
};
</script>
