<template>
  <main-page-tpl>
    <template v-slot:logo></template>
    <template v-slot:panel>A D M I N I S T R A D O R</template>
    <template v-slot:title> {{ $t('gral.pages.logIn') }}</template>
    <template v-slot:form>
      <q-form @submit="login">
        <m-input
          filled
          class="q-mb-md q-mt-lg"
          type="email"
          v-model="email"
          :label="$tc('user.label', 1)"
          :rules="[
            val =>
              (val && val.length > 0) ||
              $tc('user.label', 1) + $t('errors.fieldRequired'),
          ]"
        >
          <template v-slot:prepend>
            <q-icon name="person_outline" />
          </template>
        </m-input>
        <m-input
          filled
          class="q-mb-lg"
          v-model="password"
          type="password"
          :label="$t('user.password')"
        >
          <template v-slot:prepend>
            <q-icon name="check_circle_outline" />
          </template>
        </m-input>
        <q-btn
          :loading="loading"
          rounded
          @click="login"
          class="q-mb-md full-width"
          color="primary"
          no-caps
          :label="$t('gral.pages.logIn')"
        >
          <template v-slot:loading>
            <q-spinner-facebook />
          </template>
        </q-btn>
      </q-form>
    </template>
    <template v-slot:pass>
      <div class="q-mx-auto text-center text-weight-light text-caption">
        <a href="">¿Olvido su contraseña?</a>
      </div>
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
      email: null,
      password: null,
    };
  },
  methods: {
    login() {
      if (this.email === 'juliogarcia.np@gmail.com') {
        Parse.User.logIn(this.email, this.password)
          .then(user => {
            console.log('admin', user);
            this.$store.dispatch('auth/setInfoUserLogged', 'administrador');
            this.$router.push({ name: 'admi' });
            this.showMsg('ok', 'Bienvenido');
          })
          .catch(err => {
            this.showMsg('error', err);
          });
      } else {
        this.showMsg('error', 'Tu no tiener permisos para entrar');
      }
    },
    goToRestorePass() {
      this.$router.push({ name: 'forgotPassword' });
    },
  },
};
//
</script>
