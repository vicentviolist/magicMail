<template>
  <main-page-tpl>
    <template v-slot:logo></template>
    <template v-slot:panel>Reistrate</template>
    <template v-slot:form>
      <q-form>
        <m-input
          filled
          class="q-mb-sm"
          v-model="empresa"
          label="Nombre de la Empresa"
        >
          <template v-slot:prepend>
            <q-icon name="check_circle_outline" />
          </template>
        </m-input>
        <q-btn
          :loading="loading"
          rounded
          @click="alert = true"
          class="full-width q-mb-xl"
          color="primary"
          no-caps
          label="Adjunta tu documentacion"
          ><template v-slot:loading>
            <q-spinner-facebook />
          </template>
        </q-btn>
        <q-btn
          :loading="loading"
          rounded
          @click="handleAuth"
          class="full-width"
          color="primary"
          no-caps
          label="Registrate"
        >
          <template v-slot:loading>
            <q-spinner-facebook />
          </template>
        </q-btn> </q-form
      ><q-dialog v-model="alert">
        <q-card class="m-modal">
          <q-card-section>
            <div class="flex flex-center justify-between  q-mx-lg">
              <q-btn
                flat
                @click="alert = false"
                class="q-ml-xl"
                rounded
                color="primary"
                label="cancelar"
              />
            </div>
          </q-card-section>

          <q-card-section class="q-pt-lg flex flex-center">
            <div class="" style="width:70%">
              <div class="q-mb-xl">
                Para el perfil del vendedor debes cargar los siguientes dos
                documentos: RFC en PDF Datos Bancarios en PDF. <br />
                En el archivo pdf de cuenta bancaria especifica lo siguiente:<br />
                Cuenta Bancaría -Banco -Clabe interbancaria (dos veces para confirmar
                que este correcta)
              </div>
              <m-input
                filled
                class="q-mb-lg"
                required
                v-model="email2"
                label="CORREO ELECTRONICO SECUNDARIO"
              >
              </m-input>
              <m-input filled class="q-mb-lg" v-model="direccion" label="DIRECCIÓN">
              </m-input>
              <m-input
                filled
                required
                class="q-mb-lg"
                type="number"
                v-model="telefono"
                label="TELEFONO"
              >
              </m-input>
              <q-file borderless v-model="rfc" accept=".pdf" label="Elije tu RFC" />
              <q-file
                borderless
                v-model="datosBancarios"
                required
                accept=".pdf"
                label="Elije tus Datos bancarios"
              />
            </div>
          </q-card-section>

          <q-card-actions align="right" class="q-mb-xl">
            <q-btn
              rounded
              label="Enviar"
              class="q-mr-xl"
              color="primary"
              @click="enviarDocumeents"
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </template>
  </main-page-tpl>
</template>

<script>
import MainPageTpl from './MainPageTpl';
import Parse from 'parse';

export default {
  name: 'main-page',
  components: {
    MainPageTpl,
  },
  data() {
    return {
      loading: false,
      email2: null,
      direccion: null,
      telefono: null,
      alert: false,
      rfc: null,
      datosBancarios: null,
      empresa: null,
      role: 'vendedor',
    };
  },
  methods: {
    handleAuth() {
      let user = Parse.User.current();
      let Child = Parse.Object.extend('Tienda');
      let child = new Child();

      let parent = user;
      child
        .save({
          nombre: this.empresa,
        })
        .then(
          child => {
            this.$router.push({ name: 'vendedor' });
            this.showMsg('ok', 'Bienvenido Tienda registrada');
          },
          error => {
            console.log(error);
          },
        );
      parent.save({ tiendaPointer: child });
    },
    cerrarcesion() {
      Parse.User.logOut().then(() => {
        const currentUser = Parse.User.current(); // this will now be null
      });
    },
    enviarDocumeents() {
      let user = Parse.User.current();
      let email2 = this.email2;
      let dirección = this.direccion;
      let telefono = this.telefono;
      let rfc = new Parse.File('rfc.pdf', this.rfc);
      let cuentaBancaria = new Parse.File('cuentaBan.pdf', this.datosBancarios);
      this.alert = false;
      user
        .save({
          email2: email2,
          direccion: dirección,
          telefono: telefono,
          Type: 'proveedor',
          rfc: rfc,
          cuentaBancaria: cuentaBancaria,
        })
        .then(
          user => {
            this.showMsg('ok', 'Información enviada');
          },
          error => {
            this.showMsg('error', 'Llena todos los campos');
          },
        );
      this.showMsg('ok', 'Información enviada');
    },
    goToRestorePass() {
      this.$router.push({ name: 'forgotPassword' });
    },
  },
};
</script>
