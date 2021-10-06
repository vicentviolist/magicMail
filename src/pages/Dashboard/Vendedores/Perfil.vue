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
          color="bg-perfil"
          iconFondo="img/mini-report.svg"
          description=""
        />
        <div class="text-h4 m-y-auto">Perfil</div>
      </div>
    </template>
    <template v-slot:desc>
      <div class="q-mb-lg" style="width:20%">
        Hola {{ name }} En esta sección podra editar tu perfil!
      </div>
    </template>
    <template v-slot:table>
      <div class="row q-col-gutter-lg">
        <div>tu email es: {{ email }}</div>
        <div class="">
          <m-input filled class="q-mb-md q-mt-lg" type="email" label="" />
        </div>
        <div class="">
          <m-input filled class="q-mb-md q-mt-lg" type="email" label="" />
        </div>
        <div class="">
          <m-input filled class="q-mb-md q-mt-lg" type="email" label="" />
        </div>
        <div class="">
          <m-input filled class="q-mb-md q-mt-lg" type="email" label="" />
        </div>
        <div class="">
          <q-btn
            filled
            class="q-mb-md q-mt-lg"
            type="email"
            label="Pruebas"
            @click="pruebas"
          />
        </div>
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
      email: null,
      name: null,
    };
  },
  created() {
    this.pruebas();
  },
  methods: {
    back() {
      this.$router.push({ name: 'vendedor' }).catch(e => console.log(e));
    },
    pruebas() {
      let user = Parse.User.current();
      let name = user.get('username');
      let email = user.get('email');
      if (user) {
        this.email = email;
        this.name = name;
      } else {
        // show the signup or login page
      }
    },
  },
};
</script>
