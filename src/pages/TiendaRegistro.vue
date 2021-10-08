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
          @click="handleAuth"
          class="full-width"
          color="primary"
          no-caps
          label="Registrate"
        >
          <template v-slot:loading>
            <q-spinner-facebook />
          </template>
        </q-btn>
      </q-form>
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
            this.showMsg('ok', 'Bienvenido');
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
    goToRestorePass() {
      this.$router.push({ name: 'forgotPassword' });
    },
  },
};
</script>
