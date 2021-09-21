<template>
  <main-page-tpl>
    <template v-slot:logo></template>
    <template v-slot:panel>A D M I N I S T R A D O R</template>
    <template v-slot:title> {{ $t('gral.pages.logIn') }}</template>
    <template v-slot:form>
      <q-form @submit="handleAuth">
        <m-input
          filled
          class="q-mb-md q-mt-lg"
          type="email"
          v-model="form.username"
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
          v-model="form.password"
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
          @click="admiV"
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

export default {
  name: 'main-page',
  components: {
    MainPageTpl,
  },
  data() {
    return {
      loading: false,
      value: null,
      form: {
        username: null,
        password: null,
      },
    };
  },
  methods: {
    async handleAuth() {
      const { username, password } = this.form;
      this.loading = true;
      try {
        this.user = await this.$Auth.signIn(username, password);
        if (this.user.challengeName === 'NEW_PASSWORD_REQUIRED') {
          //this.$router.push({ name: 'newPassword' });
        } else {
          this.$router.push({ name: 'dashboard' });
        }
      } catch (err) {
        if (err.code === 'UserNotConfirmedException') {
          this.showMsg('error', this.$t('errors.amplify.registerIncomplete'));
        } else if (err.code === 'PasswordResetRequiredException') {
          this.showMsg('error', this.$t('errors.amplify.passNotLongerValid'));
        } else if (
          err.code === 'NotAuthorizedException' ||
          err.code === 'UserNotFoundException'
        ) {
          if (err.message == 'Incorrect username or password.') {
            this.showMsg('error', this.$t('errors.amplify.invalidCredentials'));
          } else {
            this.showMsg('error', this.$t('errors.amplify.disableUser'));
          }
        } else {
          this.showMsg('error', err);
          // eslint-disable-next-line no-console
          console.log(err);
        }
      } finally {
        this.loading = false;
      }
    },
    goToRestorePass() {
      this.$router.push({ name: 'forgotPassword' });
    },
    admiV() {
      this.$router.push({ name: 'admi' });
    },
  },
};
</script>
