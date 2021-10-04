<template>
  <main-page-tpl>
    <template v-slot:logo></template>
    <template v-slot:panel>Reistrate</template>
    <template v-slot:form>
      <q-form @submit="handleAuth">
        <m-input filled class="q-mt-md" type="email" v-model="email" label="correo">
          <template v-slot:prepend>
            <q-icon name="person_outline" />
          </template>
        </m-input>
        <m-input
          filled
          class="q-mb-sm"
          v-model="password"
          type="password"
          :label="$t('user.password')"
        >
          <template v-slot:prepend>
            <q-icon name="check_circle_outline" />
          </template>
        </m-input>
        <m-input filled class="q-mb-sm" v-model="username" label="Nombre Completo">
          <template v-slot:prepend>
            <q-icon name="check_circle_outline" />
          </template>
        </m-input>
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
          type="submit"
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
    <template v-slot:pass>
      <div class="q-mt-sm" @click="iniciarSesion" style="cursor: pointer;">
        Inicia sesión
      </div></template
    >
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
      value: null,
      username: null,
      password: null,
      email: null,
      empresa: null,
      role: 'vendedor',
    };
  },
  methods: {
    handleAuth() {
      let user = new Parse.User();

      user.set('username', this.username);
      user.set('email', this.email);
      user.set('password', this.password);
      user.set('empresa', this.empresa);

      user
        .signUp()
        .then(ok => {
          this.showMsg('ok', 'Bienvenido registrado con exito');
          this.$router
            .push({ name: 'vendedor' })
            .catch(e => this.showMsg('error', e));
        })
        .catch(err => {
          this.showMsg('error', err);
        });
    },
    cerrarcesion() {
      Parse.User.logOut().then(() => {
        const currentUser = Parse.User.current(); // this will now be null
      });
    },
    goToRestorePass() {
      this.$router.push({ name: 'forgotPassword' });
    },
    iniciarSesion() {
      this.$router.push({ name: 'login' });
    },
  },
};
</script>
