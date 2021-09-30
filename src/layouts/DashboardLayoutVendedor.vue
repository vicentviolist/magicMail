<template>
  <q-layout view="hHh lpR fFf">
    <div elevated class=" bg-white q-px-lg q-py-sm">
      <div class="row items-center">
        <div class="text-primary text-h2">
          MAGIC MAIL
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
            label="Vendedor"
            placeholder="Vendedor"
            @input="cerrarcesion"
          >
            <template v-slot:append>
              <q-icon name="keyboard_arrow_down" />
            </template>
          </q-select>
        </div>
        <e-avatar size="40px" class="q-mr-md" />
      </div>
    </div>
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
export default {
  components: {
    EAvatar,
  },
  data() {
    return {
      options: [{ label: 'cerrar sesion', vale: 1 }],
      sesion: null,
    };
  },
  methods: {
    cerrarcesion() {
      let self = this;
      Parse.User.logOut().then(user => {
        Parse.User.current();
        self.$router.push({ name: 'login' });
        this.showMsg('error', 'Cerraste sesión');
      });
    },
  },
};
</script>
