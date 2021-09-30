<template>
  <q-layout view="hHh lpR fFf">
    <div elevated class=" bg-white q-px-lg q-py-sm">
      <div class="row items-center">
        <div class="text-primary text-h2">
          MAGIC MAIL
        </div>
        <q-space />
        <q-select borderless v-model="model" :options="options" label="Borderless">
          <template v-slot:append>
            <q-icon name="clear" size="xs" class="cursor-pointer" />
            <q-icon name="keyboard_arrow_down" />
          </template>
        </q-select>
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
      model: null,
    };
  },
  methods: {
    cerrarcesion() {
      Parse.User.logOut().then(() => {
        const currentUser = Parse.User.current(); // this will now be null
      });
    },
  },
};
</script>
