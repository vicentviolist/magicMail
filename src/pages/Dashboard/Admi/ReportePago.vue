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
          isCustom
          description=""
          color="bg-positive"
          iconFondo="img/001-hand.svg"
        />
        <div class="text-h4 m-y-auto">Reporte Pagos</div>
      </div>
    </template>
    <template v-slot:desc>
      <div class="q-mb-lg" style="width:35%">
        En este modulo podras obtener el link para visitar la pagina de Conekta y
        visualizar tus compras.
      </div>
      <q-btn
        rounded
        label="Llevame a Conekta"
        icon="send"
        color="info"
        @click="llevame"
      >
      </q-btn>
    </template>
    <template v-slot:table>
      <q-btn
        rounded
        label="Llevame a la documentación de Conekta"
        icon="send"
        class="q-mt-xl"
        color="info"
        @click="llevameDocument"
      >
      </q-btn>
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
    llevame() {
      window.location.href = 'https://panel.conekta.com/';
    },
    llevameDocument() {
      window.location.href = 'https://developers.conekta.com/';
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
