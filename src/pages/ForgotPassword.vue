<template>
  <main-page-tpl>
    <template v-slot:logo></template>
    <template v-slot:panel>PANEL VENDEDOR</template>
    <template v-slot:title> Se enviara un correo para restablecer</template>
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
        <q-btn
          :loading="loading"
          rounded
          type="submit"
          class="q-mb-md full-width"
          color="primary"
          no-caps
          label="Recuperar"
        >
          <template v-slot:loading>
            <q-spinner-facebook />
          </template>
        </q-btn>
      </q-form>
    </template>
    <template v-slot:pass>
      <div class="q-mx-auto text-center text-weight-light text-caption">
        <div @click="goToRestorePass" style="cursor: pointer;">
          Inicia sesión
        </div>
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
      email: '',
    };
  },
  methods: {
    login() {
      let email = this.email;
      Parse.User.requestPasswordReset(email)
        .then(() => {
          this.showMsg('ok', 'Correo enviado, revisa tu correo y inica sesión');
        })
        .catch(error => {
          this.showMsg('Error: ' + error.code + ' ' + error.message);
        });
    },
    goToRestorePass() {
      this.$router.push({ name: 'login' });
    },
  },
};
</script>
