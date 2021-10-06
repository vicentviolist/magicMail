<template>
  <q-layout view="hHh lpR fFf">
    <q-header class=" bg-white q-px-lg q-py-sm">
      <div class="row items-center">
        <div class="">
          <img src="/img/title.png" class="img-dash" alt="" />
        </div>
        <q-space />
        <div style="width: 200px;">
          <q-select
            v-model="sesion"
            borderless
            :options="options"
            hide-dropdown-icon
            transition-show="scale"
            transition-hide="scale"
            :label="name"
            placeholder="Usuario"
            @input="cerrarcesion"
          >
            <template v-slot:append>
              <q-icon name="keyboard_arrow_down" />
            </template>
          </q-select>
        </div>
        <e-avatar size="40px" class="q-mr-md" />
      </div>
    </q-header>
    <q-page-container>
      <router-view />
      <q-footer class="text-center text-black bg-white text-weight-light q-py-lg"
        >Política de privacidad | Términos y condiciones | Copyright © 2021 Magic
        Mail Todos los derechos reservados.</q-footer
      >
    </q-page-container>
  </q-layout>
</template>

<script>
import EAvatar from 'src/components/local/EAvatar';
import Parse from 'parse';
import { mapState } from 'vuex';
export default {
  components: {
    EAvatar,
  },
  data() {
    return {
      options: [{ label: 'cerrar sesion', vale: 1 }],
      email: null,
      name: null,
      sesion: null,
    };
  },
  computed: {
    ...mapState('auth', ['role']),
  },
  created() {
    this.pruebas();
  },
  methods: {
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
    cerrarcesion() {
      let self = this;
      Parse.User.logOut().then(user => {
        Parse.User.current();
        if (this.role == 'administrador') {
          self.$router.push({ name: 'loginAdmin' });
        } else {
          self.$router.push({ name: 'login' });
        }
        this.showMsg('error', 'Cerraste sesión');
      });
    },
  },
};
</script>
