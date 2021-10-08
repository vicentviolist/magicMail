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
        En esta parte podras dar de Alta, Baja, Editar, todos los usuarios clientes.
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
          :loading="loading"
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
        <q-card class="m-modal">
          <q-card-section>
            <div class="flex flex-center justify-between  q-mx-lg">
              <div class="text-h6">Perfil del Usuario</div>

              <q-btn
                flat
                @click="closeModal"
                class="q-ml-xl"
                rounded
                color="primary"
                label="cancelar"
              />
            </div>
          </q-card-section>

          <q-card-section class="q-pt-lg flex flex-center">
            <div class="" style="width:70%">
              <m-input filled class="q-mb-lg" v-model="name" label="NOMBRE">
              </m-input>
              <m-input
                filled
                class="q-mb-lg"
                v-model="email"
                label="CORREO ELECTRONICO"
              >
              </m-input>
              <m-input
                filled
                class="q-mb-lg"
                v-if="!editMode"
                v-model="password"
                :type="isPwd ? 'password' : 'text'"
                hint="Password with toggle"
                label="PASSWORD"
              >
                <template v-slot:append>
                  <q-icon
                    :name="isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd = !isPwd"
                  />
                </template>
              </m-input>
            </div>
          </q-card-section>

          <q-card-actions align="right" class="q-mb-xl">
            <q-btn
              v-if="editMode"
              @click="borrar"
              rounded
              label="Eliminar"
              color="dark"
            />
            <q-btn
              v-if="!editMode"
              rounded
              label="Crear"
              class="q-mr-xl"
              color="primary"
              @click="nuevoUsuarui"
            />
            <q-btn
              rounded
              v-if="editMode"
              label="Editar"
              class="q-mr-xl"
              color="primary"
              @click="nuevoUsuarui"
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
      isPwd: true,
      name: null,
      indexToEdit: null,
      identificador: null,
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
          align: 'center',
        },
        {
          name: 'email',
          label: 'Correo Electronico',
          headerStyle: 'color: #6D7F9F',
          style: 'background: #F8F8F8;',
          field: 'email',
          align: 'center',
        },
        {
          name: 'password',
          label: 'Password',
          headerStyle: 'color: #6D7F9F',
          style: 'background: #F8F8F8;',
          field: 'password',
          align: 'center',
        },
        {
          name: 'ultimoPedido',
          label: 'Último Pedido',
          headerStyle: 'color: #6D7F9F',
          style: 'background: #F8F8F8;',
          field: 'ultimoPedido',
          align: 'center',
        },
      ],
      data: [],
    };
  },
  created() {
    this.tabla();
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
      this.editMode = false;
    },
    async openModal(id) {
      //--> se tiene qu llamar el action que consulte por id
      /* this.indexToEdit = this.data.findIndex(user => user.identificador == id);
      //<-- aqui termina la consulta al back
      this.identificador = this.data[this.indexToEdit].identificador;
      this.name = this.data[this.indexToEdit].name;
      this.email = this.data[this.indexToEdit].email;
      this.password = this.data[this.indexToEdit].password;
      this.alert = true;
      this.editMode = true;
      console.log(user); */
      const users = Parse.Object.extend('_User');
      const query = new Parse.Query(users);
      const results = await query.find();
      for (let i = 0; i < results.length; i++) {
        const object = results[i];
        object.id = this.identificador;
        this.indexToEdit = this.data.findIndex(user => user.identificador == id);
        //<-- aqui termina la consulta al back
        this.identificador = this.data[this.indexToEdit].identificador;
        let obj = results.find(elemento => elemento.id == this.identificador);
        this.name = this.data[this.indexToEdit].name;
        this.email = this.data[this.indexToEdit].email;
        this.password = this.data[this.indexToEdit].password;
        this.alert = true;
      }
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
            user.nombre = this.name;
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
    async nuevoUsuarui() {
      const Usuario = Parse.Object.extend('_User');
      const usuario = new Usuario();
      const file = new Parse.File('icon.jpg', this.image);

      usuario.set('username', this.email);
      usuario.set('nombre', this.name);
      usuario.set('password', this.password);
      usuario.set('email', this.email);

      usuario.save().then(
        usuario => {
          // Execute any logic that should take place after the object is saved.
          alert('New object created with objectId: ' + usuario.id);
        },
        error => {
          alert('Failed to create new object, with error code: ' + error.message);
        },
      );
    },
    async borrar() {
      let users = Parse.Object.extend('_User');
      let query = new Parse.Query(users);
      let results = await query.find();
      let obj = results.find(elemento => elemento.id == this.identificador);
      console.log(obj.id);
      Parse.Cloud.run('deleteUserWithId', { userId: obj.id }).then(function(
        ratings,
      ) {});
    },
    async tabla() {
      this.loading = true;
      let users = Parse.User.extend('_User');
      let query = new Parse.Query(users);
      let results = await query.find();
      for (let i = 0; i < results.length; i++) {
        let usuario = results[i];
        let name = usuario.get('nombre');
        let email = usuario.get('username');
        const role = new Parse.Role('administrador', roleACL);
        role.getUsers().add(usersToAddToRole);
        role.getRoles().add(rolesToAddToRole);
        role.save();
        let password = '*****************';
        let registro = usuario.attributes.createdAt.toLocaleDateString();
        let identificador = usuario.id;
        let ob = { name, identificador, email, password, registro };
        this.data.push(ob);
      }
      this.loading = false;
    },
    delete() {},
  },
};
</script>
