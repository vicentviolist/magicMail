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
        <m-card isMini description="" iconFondo="img/min-fam.svg" />
        <div class="text-h4 m-y-auto">Usuarios Clientes</div>
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
        label="Nuevo Usuario"
        @click="alert = true"
        icon="add"
        color="info"
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
          <template v-slot:body-cell-name="props">
            <q-td :props="props">
              <div
                class="cursor-pointer flex flex-center"
                @click="openModal(props.row.identificador)"
              >
                {{ props.row.name }}
              </div>
            </q-td>
          </template>
        </q-table>
      </div>
      <q-dialog v-model="alert">
        <q-card>
          <q-card-section>
            <div class="flex flex-center justify-between m-modal">
              <div class="text-h6 q-mr-xl">Perfil del Usuario</div>
              <q-btn flat @click="closeModal" round color="primary" icon="close" />
            </div>
          </q-card-section>

          <q-card-section class="q-pt-lg flex flex-center m-modal">
            <div class="" style="width:70%">
              <m-input filled class="q-mb-lg" v-model="name" label="NOMBRE">
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
              <div class="q-pa-md">
                <q-file
                  v-model="files"
                  label="Pick files"
                  filled
                  counter
                  :counter-label="counterLabelFn"
                  max-files="3"
                  accept=".pdf"
                  multiple
                  style="max-width: 300px"
                >
                  <template v-slot:prepend>
                    <q-icon name="attach_file" />
                  </template>
                </q-file>
              </div>
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
      loading: false,
      name: null,
      indexToEdit: null,
      identificador: null,
      files: null,
      email: null,
      password: null,
      ultimoPedido: null,
      editMode: false,
      alert: false,
      filter: '',
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
          name: 'identificador',
          align: 'center',
          headerStyle: 'color: #6D7F9F',
          style: 'background: #F8F8F8;',
          label: 'Identificador',
          field: 'identificador',
          sortable: true,
        },
        {
          name: 'registro',
          label: 'Registro',
          field: 'registro',
          sortable: true,
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
          name: 'Vicente Olivares',
          identificador: 'IAJ0980LO',
          registro: '12/02/2021',
          email: 'user.test@test.mx',
          password: '*************',
          ultimoPedido: 'OPG092089',
        },
        {
          name: 'Juan Perez',
          identificador: 'IBJ0940FV',
          registro: '12/02/2021',
          email: 'user.test@test.mx',
          password: '*************',
          ultimoPedido: 'OPG092090',
        },
        {
          name: 'Juan Perez',
          identificador: 'IBJ4580FV',
          registro: '12/02/2021',
          email: 'user.test@test.mx',
          password: '*************',
          ultimoPedido: 'OPG092090',
        },
        {
          name: 'Juan Perez',
          identificador: 'IBJ080FV',
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
    handleAuth() {
      let user = new Parse.User();

      user.set('username', this.username);
      user.set('email', this.email);
      user.set('password', this.password);
      user.set('empresa', this.empresa);

      user
        .signUp()
        .then(ok => {
          this.showMsg('ok', 'Administrador registrado con exito').catch(e =>
            this.showMsg('error', e),
          );
        })
        .catch(err => {
          this.showMsg('error', err);
        });
      let roleACL = new Parse.ACL();
      roleACL.setPublicReadAccess(true);
      let role = new Parse.Role('Administrador', roleACL);
      role.save();
    },
    closeModal() {
      this.identificador = null;
      this.name = null;
      this.email = null;
      this.password = null;
      this.alert = false;
    },
    openModal(id) {
      //--> se tiene qu llamar el action que consulte por id
      this.indexToEdit = this.data.findIndex(user => user.identificador == id);
      //<-- aqui termina la consulta al back
      this.identificador = this.data[this.indexToEdit].identificador;
      this.name = this.data[this.indexToEdit].name;
      this.email = this.data[this.indexToEdit].email;
      this.password = this.data[this.indexToEdit].password;
      this.alert = true;
      this.editMode = true;
    },
    counterLabelFn({ totalSize, filesNumber, maxFiles }) {
      return `${filesNumber} files of ${maxFiles} | ${totalSize}`;
    },
    addUser() {
      this.alert = false;
      let name = this.name;
      let identificador = this.identificador;
      let email = this.email;
      let password = this.password;
      var hoy = new Date();
      let registro =
        hoy.getDate() + '/' + (hoy.getMonth() + 1) + '/' + hoy.getFullYear();
      let ob = {
        name,
        identificador,
        email,
        password,
        registro,
      };
      if (this.editMode) {
        // llamar a la api de PUT por id
        let userId = this.data.map((user, index) => {
          if (index == this.indexToEdit) {
            user.identificador = this.identificador;
            user.name = this.name;
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
      this.name = null;
      this.email = null;
      this.password = null;
      this.editMode = false;
    },
  },
};
</script>
