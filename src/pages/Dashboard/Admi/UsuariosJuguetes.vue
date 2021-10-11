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
        En esta parte podras dar de Alta, Baja, Editar, todos los usuarios
        vendedores.
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
          style="width:70%"
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
          style="height: 300px; width:90%;"
          :data="data"
          :loading="loading"
          :columns="columns"
          row-key="id"
          :filter="filter"
          virtual-scroll
          :rows-per-page-options="[0]"
        >
          <template v-slot:body-cell-rfcButton="props">
            <q-td :props="props">
              <q-btn rounded label="Descargar" color="primary" />
            </q-td>
          </template>
          <template v-slot:body-cell-cuentaButton="props">
            <q-td :props="props">
              <q-btn rounded label="Descargar" color="primary" />
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
              <m-input filled class="q-mb-lg" v-model="jugueteria" label="EMPRESA">
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
              @click="editar"
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
import FileSaver from 'file-saver';

export default {
  name: 'main-page',
  components: {
    MainTempl,
  },
  data() {
    return {
      loading: null,
      isPwd: false,
      jugueteria: null,
      identificador: null,
      archivo: null,
      name: null,
      document: null,
      file0ne: null,
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
          name: 'telefono',
          label: 'Numero de telefono',
          headerStyle: 'color: #6D7F9F',
          style: 'background: #F8F8F8;',
          field: 'telefono',
          align: 'center',
        },
        {
          name: 'direccion',
          label: 'Dirección',
          headerStyle: 'color: #6D7F9F',
          style: 'background: #F8F8F8;',
          field: 'direccion',
          align: 'center',
        },
        {
          name: 'email2',
          label: 'Email sacundario',
          headerStyle: 'color: #6D7F9F',
          style: 'background: #F8F8F8;',
          field: 'email2',
          align: 'center',
        },
        {
          name: 'rfc',
          label: 'RFC',
          headerStyle: 'color: #6D7F9F',
          style: 'background: #F8F8F8;',
          field: 'rfc',
          align: 'center',
        },
        {
          name: 'cuentaBancaria',
          label: 'Cuenta Bancaria',
          headerStyle: 'color: #6D7F9F',
          style: 'background: #F8F8F8;',
          field: 'cuentaBancaria',
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
    closeModal() {
      this.identificador = null;
      this.jugueteria = null;
      this.email = null;
      this.editMode = false;
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
      this.name = this.data[this.indexToEdit].name;
      this.alert = true;
      this.editMode = true;
    },
    async editar() {
      let users = Parse.User.extend('_User');
      let query = new Parse.Query(users);
      query.equalTo('Type', 'proveedor');
      let results = await query.find();
      let userOnj = results.find(users => users.id == this.identificador);
      let username = this.name;
      let empresa = this.jugueteria;
      let email = this.email;
      userOnj
        .save({
          nombre: username,
          username: email,
          empresa: empresa,
        })
        .then(
          userOnj => {
            this.showMsg('ok', 'Editado');
          },
          error => {
            this.showMsg('ok', error);
          },
        );
      console.log(username);
      this.alert = false;
    },
    download() {
      axios({
        url: this.archivo,
        method: 'GET',
        responseType: 'blob',
      }).then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'cliente.pdf');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
    },
    async nuevoUsuarui() {
      const Usuario = Parse.Object.extend('_User');
      const usuario = new Usuario();
      const file = new Parse.File('icon.jpg', this.image);

      usuario.set('username', this.email);
      usuario.set('nombre', this.name);
      usuario.set('password', this.password);
      usuario.set('email', this.email);
      usuario.set('empresa', this.jugueteria);
      usuario.set('Type', 'proveedor');

      usuario.save().then(
        usuario => {
          // Execute any logic that should take place after the object is saved.
          alert('New object created with objectId: ' + usuario.id);
        },
        error => {
          alert('Failed to create new object, with error code: ' + error.message);
        },
      );
      this.alert = false;
    },
    async tabla() {
      this.loading = true;
      const users = Parse.Object.extend('_User');
      const query = new Parse.Query(users);
      query.equalTo('Type', 'proveedor');
      const results = await query.find();
      for (let i = 0; i < results.length; i++) {
        const usuarioJuguete = results[i];
        let name = usuarioJuguete.get('nombre');
        let email = usuarioJuguete.get('username');
        let password = '*****************';
        let registro = usuarioJuguete.attributes.createdAt.toLocaleDateString();
        let jugueteria = usuarioJuguete.get('empresa');
        let telefono = usuarioJuguete.get('telefono');
        let direccion = usuarioJuguete.get('direccion');
        let email2 = usuarioJuguete.get('email2');
        let rfc = usuarioJuguete.get('rfc').url();
        let cuentaBancaria = usuarioJuguete.get('cuentaBancaria').url();
        console.log(cuentaBancaria);
        let identificador = usuarioJuguete.id;
        let ob = {
          name,
          identificador,
          email,
          password,
          registro,
          jugueteria,
          telefono,
          cuentaBancaria,
          rfc,
          direccion,
          email2,
        };
        this.data.push(ob);
      }
      this.loading = false;
    },
  },
};
</script>
